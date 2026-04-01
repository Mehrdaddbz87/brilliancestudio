const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedCms() {
  await prisma.servicePage.upsert({
    where: { slug: "services" },
    update: {
      eyebrow: "Database CMS",
      title: "Services",
      description:
        "High-end renovation and design services managed through Prisma and PostgreSQL.",
      seoTitle: "Services | Brilliance Studio",
      seoDescription:
        "Database-backed renovation and design service content for Brilliance Studio in Canada.",
      primaryCtaLabel: "Send inquiry",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Contact us",
      secondaryCtaHref: "/contact",
      sections: [
        {
          _key: "db-services-1",
          _type: "textSection",
          eyebrow: "Database Seed",
          heading: "Service page content from PostgreSQL",
          body: "This sample content is stored in PostgreSQL via Prisma and can be used as a structured fallback for your CMS-driven pages.",
        },
      ],
      items: {
        deleteMany: {},
        create: [
          {
            slug: "custom-home-design-build",
            eyebrow: "Design + Build",
            title: "Custom Home Design & Build",
            description:
              "End-to-end planning and execution for clients seeking a refined, custom-built home.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Custom home design and build placeholder",
            sortOrder: 1,
          },
          {
            slug: "home-additions",
            eyebrow: "Expansion",
            title: "Home Additions",
            description:
              "Integrated home additions designed to expand space and preserve architectural continuity.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Home additions placeholder",
            sortOrder: 2,
          },
          {
            slug: "kitchen-remodeling",
            eyebrow: "Remodeling",
            title: "Kitchen Remodeling",
            description:
              "Kitchen renovations focused on flow, material quality, and polished everyday performance.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Kitchen remodeling placeholder",
            sortOrder: 3,
          },
          {
            slug: "bathroom-remodeling",
            eyebrow: "Remodeling",
            title: "Bathroom Remodeling",
            description:
              "High-end bathroom upgrades shaped around comfort, durability, and elegant detailing.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Bathroom remodeling placeholder",
            sortOrder: 4,
          },
          {
            slug: "interior-exterior-design",
            eyebrow: "Design",
            title: "Interior & Exterior Design",
            description:
              "Unified design direction for interior and exterior spaces with premium visual clarity.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Interior and exterior design placeholder",
            sortOrder: 5,
          },
          {
            slug: "structural-modifications-framing",
            eyebrow: "Structure",
            title: "Structural Modifications & Framing",
            description:
              "Precise structural and framing work that supports safe, design-led renovation.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Structural modifications and framing placeholder",
            sortOrder: 6,
          },
          {
            slug: "basement-finishing",
            eyebrow: "Lower Level",
            title: "Basement Finishing",
            description:
              "Finished basement spaces designed for comfort, function, and long-term value.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Basement finishing placeholder",
            sortOrder: 7,
          },
        ],
      },
    },
    create: {
      slug: "services",
      eyebrow: "Database CMS",
      title: "Services",
      description:
        "High-end renovation and design services managed through Prisma and PostgreSQL.",
      seoTitle: "Services | Brilliance Studio",
      seoDescription:
        "Database-backed renovation and design service content for Brilliance Studio in Canada.",
      primaryCtaLabel: "Send inquiry",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Contact us",
      secondaryCtaHref: "/contact",
      sections: [
        {
          _key: "db-services-1",
          _type: "textSection",
          eyebrow: "Database Seed",
          heading: "Service page content from PostgreSQL",
          body: "This sample content is stored in PostgreSQL via Prisma and can be used as a structured fallback for your CMS-driven pages.",
        },
      ],
      items: {
        create: [
          {
            slug: "custom-home-design-build",
            eyebrow: "Design + Build",
            title: "Custom Home Design & Build",
            description:
              "End-to-end planning and execution for clients seeking a refined, custom-built home.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Custom home design and build placeholder",
            sortOrder: 1,
          },
          {
            slug: "home-additions",
            eyebrow: "Expansion",
            title: "Home Additions",
            description:
              "Integrated home additions designed to expand space and preserve architectural continuity.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Home additions placeholder",
            sortOrder: 2,
          },
          {
            slug: "kitchen-remodeling",
            eyebrow: "Remodeling",
            title: "Kitchen Remodeling",
            description:
              "Kitchen renovations focused on flow, material quality, and polished everyday performance.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Kitchen remodeling placeholder",
            sortOrder: 3,
          },
          {
            slug: "bathroom-remodeling",
            eyebrow: "Remodeling",
            title: "Bathroom Remodeling",
            description:
              "High-end bathroom upgrades shaped around comfort, durability, and elegant detailing.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Bathroom remodeling placeholder",
            sortOrder: 4,
          },
          {
            slug: "interior-exterior-design",
            eyebrow: "Design",
            title: "Interior & Exterior Design",
            description:
              "Unified design direction for interior and exterior spaces with premium visual clarity.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Interior and exterior design placeholder",
            sortOrder: 5,
          },
          {
            slug: "structural-modifications-framing",
            eyebrow: "Structure",
            title: "Structural Modifications & Framing",
            description:
              "Precise structural and framing work that supports safe, design-led renovation.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Structural modifications and framing placeholder",
            sortOrder: 6,
          },
          {
            slug: "basement-finishing",
            eyebrow: "Lower Level",
            title: "Basement Finishing",
            description:
              "Finished basement spaces designed for comfort, function, and long-term value.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Basement finishing placeholder",
            sortOrder: 7,
          },
        ],
      },
    },
  });

  await prisma.referencePage.upsert({
    where: { slug: "references" },
    update: {
      eyebrow: "Database CMS",
      title: "Our Portfolio",
      description:
        "Explore our latest renovation and design projects",
      seoTitle: "Portfolio | Brilliance Studio",
      seoDescription:
        "Explore our renovation and design portfolio across Canada. High-end craftsmanship and modern living spaces.",
      primaryCtaLabel: "Discuss project",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Meet the studio",
      secondaryCtaHref: "/about",
      sections: [
        {
          _key: "db-references-1",
          _type: "featureListSection",
          eyebrow: "Database Seed",
          heading: "Portfolio content managed in PostgreSQL",
          items: [
            "Portfolio cards",
            "Project images",
            "SEO metadata",
            "Flexible supporting sections",
          ],
        },
      ],
      items: {
        deleteMany: {},
        create: [
          {
            slug: "maison-aurelia",
            category: "Lifestyle",
            title: "Maison Aurelia",
            summary:
              "Editorial launch presence with cinematic pacing and premium visual restraint.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Lifestyle reference placeholder",
            sortOrder: 1,
          },
          {
            slug: "velour-residence",
            category: "Real Estate",
            title: "Velour Residence",
            summary:
              "Elegant property storytelling focused on trust, atmosphere, and inquiries.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Real estate reference placeholder",
            sortOrder: 2,
          },
          {
            slug: "noir-atelier",
            category: "Design Studio",
            title: "Noir Atelier",
            summary:
              "A refined digital identity for a selective, design-led studio practice.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Design studio reference placeholder",
            sortOrder: 3,
          },
        ],
      },
    },
    create: {
      slug: "references",
      eyebrow: "Database CMS",
      title: "Our Portfolio",
      description:
        "Explore our latest renovation and design projects",
      seoTitle: "Portfolio | Brilliance Studio",
      seoDescription:
        "Explore our renovation and design portfolio across Canada. High-end craftsmanship and modern living spaces.",
      primaryCtaLabel: "Discuss project",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Meet the studio",
      secondaryCtaHref: "/about",
      sections: [
        {
          _key: "db-references-1",
          _type: "featureListSection",
          eyebrow: "Database Seed",
          heading: "Portfolio content managed in PostgreSQL",
          items: [
            "Portfolio cards",
            "Project images",
            "SEO metadata",
            "Flexible supporting sections",
          ],
        },
      ],
      items: {
        create: [
          {
            slug: "maison-aurelia",
            category: "Lifestyle",
            title: "Maison Aurelia",
            summary:
              "Editorial launch presence with cinematic pacing and premium visual restraint.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Lifestyle reference placeholder",
            sortOrder: 1,
          },
          {
            slug: "velour-residence",
            category: "Real Estate",
            title: "Velour Residence",
            summary:
              "Elegant property storytelling focused on trust, atmosphere, and inquiries.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Real estate reference placeholder",
            sortOrder: 2,
          },
          {
            slug: "noir-atelier",
            category: "Design Studio",
            title: "Noir Atelier",
            summary:
              "A refined digital identity for a selective, design-led studio practice.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Design studio reference placeholder",
            sortOrder: 3,
          },
        ],
      },
    },
  });

  const legalPages = [
    {
      slug: "terms",
      eyebrow: "Legal",
      title: "Terms & Privacy Commitments",
      description:
        "Sample legal and privacy content stored in PostgreSQL via Prisma for Canadian operations.",
      seoTitle: "Terms | Brilliance Studio",
      seoDescription:
        "Sample database-backed terms and privacy commitments page.",
      sections: [
        {
          _key: "terms-1",
          eyebrow: "Services",
          heading: "Scope of Services",
          body: "Define project scope, deliverables, approvals, revisions, and acceptance criteria for each engagement.",
          listItems: [
            "Written proposals define the applicable scope.",
            "Additional requests may require re-estimation.",
            "Client delays may affect launch dates.",
          ],
        },
        {
          _key: "terms-2",
          eyebrow: "Privacy",
          heading: "PIPEDA-Aligned Information Handling",
          body: "Explain how personal information is collected, used, safeguarded, retained, and disclosed in a manner appropriate for Canadian operations.",
          contactItems: [
            {
              label: "Privacy requests",
              value: "privacy@brilliancestudio.ca",
              href: "mailto:privacy@brilliancestudio.ca",
            },
          ],
        },
      ],
    },
    {
      slug: "impressum",
      eyebrow: "Legal",
      title: "Imprint",
      description:
        "Sample business disclosure and privacy contact content stored in PostgreSQL via Prisma.",
      seoTitle: "Imprint | Brilliance Studio",
      seoDescription:
        "Sample database-backed business disclosure and privacy contact page.",
      sections: [
        {
          _key: "impressum-1",
          eyebrow: "Business Identity",
          heading: "Company Information",
          body: "Add registered company name, address, business email, and jurisdiction-specific disclosure details here.",
          contactItems: [
            {
              label: "Email",
              value: "hello@brilliancestudio.ca",
              href: "mailto:hello@brilliancestudio.ca",
            },
          ],
        },
        {
          _key: "impressum-2",
          eyebrow: "Privacy",
          heading: "Responsible Person",
          body: "List the responsible contact for legal notices and privacy inquiries here.",
          contactItems: [
            {
              label: "Privacy officer",
              value: "privacy@brilliancestudio.ca",
              href: "mailto:privacy@brilliancestudio.ca",
            },
          ],
        },
      ],
    },
  ];

  for (const page of legalPages) {
    await prisma.legalPage.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    });
  }
}

async function seedSubmissions() {
  await prisma.contactRequest.deleteMany();

  await prisma.contactRequest.createMany({
    data: [
      {
        name: "Anna Becker",
        email: "anna@example.com",
        service: "Custom Home Design & Build",
        company: "Maison Aurelia",
        message:
          "We need a refined landing experience for an upcoming product launch.",
      },
      {
        name: "Luca Hartmann",
        email: "luca@example.com",
        service: "Interior & Exterior Design",
        company: "Velour Residence",
        message:
          "Looking for a premium property presentation website with strong inquiry flow.",
      },
    ],
  });
}

async function main() {
  await seedCms();
  await seedSubmissions();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
