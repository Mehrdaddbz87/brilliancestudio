import { render, screen } from "@testing-library/react";

import ReferencesPage from "@/pages/references";
import ServicesPage, { getServerSideProps } from "@/pages/services";
import { getPageContent } from "@/lib/sanity";

jest.mock("@/lib/sanity", () => ({
  getPageContent: jest.fn(),
}));

jest.mock("@/components/fade-in-section", () => ({
  FadeInSection: ({ children }) => <>{children}</>,
}));

jest.mock("@/components/cms-sections", () => ({
  CmsSections: () => null,
}));

jest.mock("@/components/page-intro", () => ({
  PageIntro: ({ title, description }) => (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  ),
}));

jest.mock("@/components/card", () => ({
  Card: ({ title, description, media }) => (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      {media}
    </article>
  ),
}));

jest.mock("@/components/button", () => ({
  Button: ({ children, href }) => <a href={href || "#"}>{children}</a>,
}));

jest.mock("@/components/responsive-image", () => ({
  ResponsiveImage: ({ src, alt }) => <img src={src} alt={alt} />,
}));

describe("CMS data flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads services page data from Sanity", async () => {
    const content = {
      title: "Services",
      description: "CMS-driven services page.",
      items: [],
      sections: [],
    };

    getPageContent.mockResolvedValue(content);

    const result = await getServerSideProps();

    expect(getPageContent).toHaveBeenCalledWith("services");
    expect(result).toEqual({
      props: {
        content,
      },
    });
  });

  it("renders reference images from CMS content correctly", () => {
    const content = {
      eyebrow: "CMS Content",
      title: "References",
      description: "Selected work",
      items: [
        {
          category: "Residential",
          title: "Lake House",
          summary: "Premium renovation storytelling.",
          image: {
            url: "https://cdn.sanity.io/images/demo/reference.jpg",
            alt: "Lake House reference image",
          },
        },
      ],
      sections: [],
    };

    render(<ReferencesPage content={content} />);

    expect(screen.getByText("Lake House")).toBeInTheDocument();
    expect(
      screen.getByAltText("Lake House reference image"),
    ).toHaveAttribute("src", "https://cdn.sanity.io/images/demo/reference.jpg");
  });

  it("renders services content fetched from CMS props", () => {
    const content = {
      eyebrow: "CMS Content",
      title: "Services",
      description: "Tailored services from Sanity.",
      items: [
        {
          eyebrow: "Strategy",
          title: "Concept Development",
          description: "Defined and delivered via CMS content.",
          image: null,
        },
      ],
      sections: [],
    };

    render(<ServicesPage content={content} />);

    expect(screen.getByRole("heading", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByText("Concept Development")).toBeInTheDocument();
    expect(
      screen.getByText("Defined and delivered via CMS content."),
    ).toBeInTheDocument();
  });

  it("renders services page with empty CMS items without crashing", () => {
    const content = {
      eyebrow: "",
      title: "",
      description: "",
      items: [],
      sections: [],
    };

    const { container } = render(<ServicesPage content={content} />);

    expect(container.querySelector("main")).toBeTruthy();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("renders references page with empty CMS items without crashing", () => {
    const content = {
      eyebrow: "",
      title: "",
      description: "",
      items: [],
      sections: [],
    };

    const { container } = render(<ReferencesPage content={content} />);

    expect(container.querySelector("main")).toBeTruthy();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
