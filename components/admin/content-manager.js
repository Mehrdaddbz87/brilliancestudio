import { signOut } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/button";

function sortByOrder(items) {
  return [...items].sort((left, right) => left.sortOrder - right.sortOrder);
}

function ImageUploadField({ name, value, onChange, placeholder }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    const body = new FormData();
    body.append("file", file);

    try {
      const response = await fetch("/api/upload", { method: "POST", body });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed.");
      }

      onChange({ target: { name, value: result.url } });
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder || "/uploads/image.jpg"}
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent transition hover:bg-accent/20 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {uploadError ? (
        <p className="text-sm text-red-300">{uploadError}</p>
      ) : null}
      {value ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <img
            src={value}
            alt="Preview"
            className="max-h-48 w-full object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
      ) : null}
    </div>
  );
}

export function ContentManager({
  sectionLabel,
  title,
  description,
  endpoint,
  fields,
  initialItems,
  onFormDataChange,
}) {
  const emptyState = useMemo(
    () =>
      fields.reduce((accumulator, field) => {
        accumulator[field.name] = "";
        return accumulator;
      }, {}),
    [fields],
  );
  const [items, setItems] = useState(sortByOrder(initialItems));
  const [formData, setFormData] = useState(emptyState);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status.type !== "success" || !status.message) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setStatus({ type: "", message: "" });
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [status]);

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => {
      const nextData = {
        ...current,
        [name]: value,
      };

      return onFormDataChange ? onFormDataChange(nextData, name) : nextData;
    });
  }

  function resetForm() {
    setFormData(emptyState);
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(
        editingId ? `${endpoint}/${editingId}` : endpoint,
        {
          method: editingId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save content.");
      }

      setItems((current) =>
        sortByOrder(
          editingId
            ? current.map((item) => (item.id === editingId ? result.item : item))
            : [...current, result.item],
        ),
      );
      setStatus({
        type: "success",
        message: editingId
          ? `${sectionLabel} entry updated.`
          : `${sectionLabel} entry created.`,
      });
      resetForm();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to save content.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id) {
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete content.");
      }

      setItems((current) => current.filter((item) => item.id !== id));
      if (editingId === id) {
        resetForm();
      }
      setStatus({
        type: "success",
        message: `${sectionLabel} entry deleted.`,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to delete content.",
      });
    }
  }

  function startEdit(item) {
    setEditingId(item.id);
    setFormData(
      fields.reduce((accumulator, field) => {
        accumulator[field.name] =
          item[field.name] === null || item[field.name] === undefined
            ? ""
            : String(item[field.name]);
        return accumulator;
      }, {}),
    );
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-background px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Local Admin
            </p>
            <h1 className="mt-4 font-fantasy text-4xl uppercase tracking-[0.08em] text-text">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-text/75">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/admin" variant="ghost">
              Admin Home
            </Button>
            <Button href="/admin/services" variant="ghost">
              Services
            </Button>
            <Button href="/admin/portfolio" variant="ghost">
              Portfolio
            </Button>
            <Button
              variant="ghost"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Sign out
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_1.35fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {editingId ? "Edit Entry" : "New Entry"}
            </p>
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                    {field.label}
                  </span>
                  {field.type === "image-upload" ? (
                    <ImageUploadField
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={updateField}
                      placeholder={field.placeholder}
                    />
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={updateField}
                      rows={field.rows || 4}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
                      required={field.required !== false}
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={updateField}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
                      required={field.required !== false}
                    >
                      <option value="">
                        {field.placeholder || `Select ${field.label}`}
                      </option>
                      {(field.options || []).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={updateField}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
                      required={field.required !== false}
                      readOnly={Boolean(field.readOnly)}
                      disabled={Boolean(field.disabled)}
                    />
                  )}
                  {field.helpText ? (
                    <p className="mt-2 text-sm text-text/55">{field.helpText}</p>
                  ) : null}
                </label>
              ))}

              {status.message ? (
                <p
                  className={
                    status.type === "success" ? "text-emerald-300" : "text-red-300"
                  }
                >
                  {status.message}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Saving..."
                    : editingId
                      ? "Update entry"
                      : "Create entry"}
                </Button>
                {editingId ? (
                  <Button type="button" variant="ghost" onClick={resetForm}>
                    Cancel edit
                  </Button>
                ) : null}
              </div>
            </form>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Existing Entries
            </p>
            <div className="mt-6 space-y-4">
              {items.length ? (
                items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/80">
                          {item.slug}
                        </p>
                        <h2 className="mt-3 text-xl font-semibold text-text">
                          {item.title}
                        </h2>
                        {item.eyebrow || item.category ? (
                          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-text/55">
                            {item.eyebrow || item.category}
                          </p>
                        ) : null}
                        <p className="mt-3 text-base leading-7 text-text/72">
                          {item.description || item.summary}
                        </p>
                        <p className="mt-3 text-sm text-text/55">
                          Sort order: {item.sortOrder}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button type="button" variant="ghost" onClick={() => startEdit(item)}>
                          Edit
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => handleDelete(item.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-black/20 p-6 text-text/65">
                  No entries yet.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
