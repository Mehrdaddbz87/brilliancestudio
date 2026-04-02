import { render, screen } from "@testing-library/react";

import PortfolioPage from "@/pages/portfolio";
import ServicesPage, { getServerSideProps } from "@/pages/services";
import { getPageContent } from "@/lib/content";

jest.mock("@/lib/content", () => ({
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

  it("loads services page data from local content", async () => {
    const content = {
      title: "Services",
      description: "Locally managed services page.",
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

  it("renders portfolio images from local content correctly", () => {
    const content = {
      eyebrow: "CMS Content",
      title: "Portfolio",
      description: "Selected work",
      items: [
        {
          category: "Residential",
          title: "Lake House",
          summary: "Premium renovation storytelling.",
          image: {
            url: "https://example.com/reference.jpg",
            alt: "Lake House reference image",
          },
        },
      ],
      sections: [],
    };

    render(<PortfolioPage content={content} />);

    expect(screen.getByText("Lake House")).toBeInTheDocument();
    expect(
      screen.getByAltText("Lake House reference image"),
    ).toHaveAttribute("src", "https://example.com/reference.jpg");
  });

  it("renders Prisma-backed renovation services on the services page", () => {
    const content = {
      eyebrow: "Database CMS",
      title: "Services",
      description: "Tailored services from PostgreSQL.",
      items: [
        {
          slug: "custom-home-design-build",
          eyebrow: "Design + Build",
          title: "Custom Home Design & Build",
          description: "Defined and delivered via PostgreSQL content.",
          image: null,
        },
      ],
      sections: [],
    };

    render(<ServicesPage content={content} />);

    expect(screen.getByRole("heading", { name: "Services" })).toBeInTheDocument();
    expect(screen.getByText("Custom Home Design & Build")).toBeInTheDocument();
    expect(
      screen.getByText(/defined and delivered via postgresql content/i),
    ).toBeInTheDocument();
  });

  it("renders no service cards when locally managed items are empty", () => {
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

  it("renders portfolio page with empty CMS items without crashing", () => {
    const content = {
      eyebrow: "",
      title: "",
      description: "",
      items: [],
      sections: [],
    };

    const { container } = render(<PortfolioPage content={content} />);

    expect(container.querySelector("main")).toBeTruthy();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
