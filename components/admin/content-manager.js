import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/button";

function DeleteConfirmModal({ itemTitle, onConfirm, onCancel, isDeleting }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-md rounded-[2rem] border border-red-400/20 bg-[#0d0d0d] p-8 shadow-[0_0_100px_rgba(239,68,68,0.12)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10">
          <svg
            aria-hidden="true"
            className="h-7 w-7 text-red-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </div>

        <h2
          id="delete-modal-title"
          className="mt-5 font-fantasy text-2xl uppercase tracking-[0.08em] text-text"
        >
          Delete entry?
        </h2>

        <p className="mt-3 text-base leading-7 text-text/70">
          You are about to permanently delete{" "}
          {itemTitle ? (
            <span className="font-semibold text-text">
              &ldquo;{itemTitle}&rdquo;
            </span>
          ) : (
            "this entry"
          )}
          . This action cannot be undone.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-2xl bg-red-500/90 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                </svg>
                Deleting…
              </>
            ) : (
              "Yes, delete permanently"
            )}
          </button>
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

function Toast({ type, message, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const isSuccess = type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-[#111] px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
      <div
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          isSuccess ? "bg-emerald-500/20" : "bg-red-500/20"
        }`}
      >
        {isSuccess ? (
          <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        )}
      </div>
      <div className="flex-1">
        <p className={`text-sm font-semibold ${isSuccess ? "text-emerald-300" : "text-red-300"}`}>
          {isSuccess ? "Success" : "Error"}
        </p>
        <p className="mt-0.5 text-sm text-text/70">{message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="ml-2 mt-0.5 text-text/35 transition hover:text-text/70"
        aria-label="Dismiss"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

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
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);

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
      setToast({
        type: "success",
        message: editingId
          ? `${sectionLabel} entry updated successfully.`
          : `${sectionLabel} entry created successfully.`,
      });
      resetForm();
    } catch (error) {
      setToast({
        type: "error",
        message: error.message || "Failed to save content.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function requestDelete(item) {
    setDeleteTarget(item);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const response = await fetch(`${endpoint}/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete content.");
      }

      setItems((current) => current.filter((item) => item.id !== deleteTarget.id));
      if (editingId === deleteTarget.id) {
        resetForm();
      }
      setToast({ type: "success", message: `${sectionLabel} entry deleted successfully.` });
    } catch (error) {
      setToast({ type: "error", message: error.message || "Failed to delete content." });
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
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
    <>
    {deleteTarget && (
      <DeleteConfirmModal
        itemTitle={deleteTarget.title}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    )}
    {toast && (
      <Toast
        type={toast.type}
        message={toast.message}
        onDismiss={() => setToast(null)}
      />
    )}
    <main className="min-h-screen bg-black px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">

        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-accent">
            Brilliance Studio
          </p>
          <nav className="flex items-center gap-5 text-xs text-text/40">
            <Link href="/admin" className="transition hover:text-accent">Dashboard</Link>
            <span>/</span>
            <Link href="/admin/services" className="transition hover:text-accent">Services</Link>
            <span>/</span>
            <Link href="/admin/portfolio" className="transition hover:text-accent">Portfolio</Link>
            <span className="mx-2 text-white/10">|</span>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="transition hover:text-accent"
            >
              Sign out
            </button>
          </nav>
        </div>

        {/* Header */}
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">Admin</p>
        <h1 className="mt-3 text-3xl font-semibold text-text">{title}.</h1>
        <p className="mt-2 text-sm leading-relaxed text-text/50">{description}</p>
        <div className="mb-10 mt-8 h-px w-full bg-accent/20" />

        <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">

          {/* Form */}
          <section>
            <p className="mb-5 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent/80">
              {editingId ? "Edit Entry" : "New Entry"}
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-text/50">
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
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text outline-none transition focus:border-accent/60 focus:bg-white/[0.06]"
                      required={field.required !== false}
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={updateField}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text outline-none transition focus:border-accent/60 focus:bg-white/[0.06]"
                      required={field.required !== false}
                    >
                      <option value="">{field.placeholder || `Select ${field.label}`}</option>
                      {(field.options || []).map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={updateField}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text outline-none transition focus:border-accent/60 focus:bg-white/[0.06]"
                      required={field.required !== false}
                      readOnly={Boolean(field.readOnly)}
                      disabled={Boolean(field.disabled)}
                    />
                  )}
                  {field.helpText ? (
                    <p className="mt-1.5 text-xs text-text/45">{field.helpText}</p>
                  ) : null}
                </label>
              ))}

              {status.message ? (
                <p className={`text-sm ${status.type === "success" ? "text-emerald-300" : "text-red-300"}`}>
                  {status.message}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : editingId ? "Update Entry" : "Create Entry"}
                </Button>
                {editingId ? (
                  <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
                ) : null}
              </div>
            </form>
          </section>

          {/* Existing entries */}
          <section>
            <p className="mb-5 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent/80">
              Existing Entries
            </p>
            <div className="space-y-3">
              {items.length ? (
                items.map((item) => (
                  <article
                    key={item.id}
                    className={`rounded-[1.25rem] border px-5 py-4 transition ${
                      editingId === item.id
                        ? "border-accent/40 bg-accent/[0.04]"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/15"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        {(item.eyebrow || item.category) && (
                          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-accent/70">
                            {item.eyebrow || item.category}
                          </p>
                        )}
                        <h2 className="mt-1 truncate text-sm font-semibold text-text">
                          {item.title}
                        </h2>
                        {(item.description || item.summary) && (
                          <p className="mt-1 line-clamp-1 text-xs text-text/40">
                            {item.description || item.summary}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-text/70 transition hover:border-accent/40 hover:text-accent"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => requestDelete(item)}
                          className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-400/70 transition hover:border-red-500/50 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-[1.25rem] border border-dashed border-white/10 p-6 text-sm text-text/40">
                  No entries yet.
                </div>
              )}
            </div>
          </section>

        </div>
      </section>
    </main>
    </>
  );
}
