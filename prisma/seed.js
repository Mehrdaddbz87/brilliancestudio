const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedCms() {
  await prisma.servicePage.upsert({
    where: { slug: "services" },
    update: {
      eyebrow: "Services",
      title: "Services",
      description:
        "High-end renovation and design services delivered with craftsmanship, precision, and efficient coordination.",
      seoTitle: "Residential Renovation Services in Canada | Brilliance Studio",
      seoDescription:
        "Custom home design-build, additions, kitchen and bathroom remodeling, basement finishing, interior and exterior design, and structural framing — premium renovation services for Canadian homeowners.",
      primaryCtaLabel: "Send inquiry",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Contact us",
      secondaryCtaHref: "/contact",
      sections: [
        {
          _key: "services-text-1",
          _type: "textSection",
          eyebrow: "Our Approach",
          heading: "Design-build coordination from first brief to final finish.",
          body: "Every renovation project at Brilliance Studio is coordinated under one clear process — from early design direction and material planning through structural execution and final detailing. We work with homeowners across Canada to deliver spaces that feel elevated, efficient, and built with long-term value in mind.",
        },
        {
          _key: "services-features-1",
          _type: "featureListSection",
          eyebrow: "Why Brilliance Studio",
          heading: "What sets our renovation services apart.",
          items: [
            "Integrated design and build coordination under one team",
            "Premium material selections and refined finish detailing",
            "Transparent project planning with realistic timelines",
            "Dedicated focus on craftsmanship and quality at every phase",
          ],
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
            imageAlt: "Custom home design and build",
            sortOrder: 1,
          },
          {
            slug: "home-additions",
            eyebrow: "Expansion",
            title: "Home Additions",
            description:
              "Integrated home additions designed to expand space and preserve architectural continuity.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Home additions",
            sortOrder: 2,
          },
          {
            slug: "kitchen-remodeling",
            eyebrow: "Remodeling",
            title: "Kitchen Remodeling",
            description:
              "Kitchen renovations focused on flow, material quality, and polished everyday performance.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Kitchen remodeling",
            sortOrder: 3,
          },
          {
            slug: "bathroom-remodeling",
            eyebrow: "Remodeling",
            title: "Bathroom Remodeling",
            description:
              "High-end bathroom upgrades shaped around comfort, durability, and elegant detailing.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Bathroom remodeling",
            sortOrder: 4,
          },
          {
            slug: "interior-exterior-design",
            eyebrow: "Design",
            title: "Interior & Exterior Design",
            description:
              "Unified design direction for interior and exterior spaces with premium visual clarity.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Interior and exterior design",
            sortOrder: 5,
          },
          {
            slug: "structural-modifications-framing",
            eyebrow: "Structure",
            title: "Structural Modifications & Framing",
            description:
              "Precise structural and framing work that supports safe, design-led renovation.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Structural modifications and framing",
            sortOrder: 6,
          },
          {
            slug: "basement-finishing",
            eyebrow: "Lower Level",
            title: "Basement Finishing",
            description:
              "Finished basement spaces designed for comfort, function, and long-term value.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Basement finishing",
            sortOrder: 7,
          },
        ],
      },
    },
    create: {
      slug: "services",
      eyebrow: "Services",
      title: "Services",
      description:
        "High-end renovation and design services delivered with craftsmanship, precision, and efficient coordination.",
      seoTitle: "Residential Renovation Services in Canada | Brilliance Studio",
      seoDescription:
        "Custom home design-build, additions, kitchen and bathroom remodeling, basement finishing, interior and exterior design, and structural framing — premium renovation services for Canadian homeowners.",
      primaryCtaLabel: "Send inquiry",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Contact us",
      secondaryCtaHref: "/contact",
      sections: [
        {
          _key: "services-text-1",
          _type: "textSection",
          eyebrow: "Our Approach",
          heading: "Design-build coordination from first brief to final finish.",
          body: "Every renovation project at Brilliance Studio is coordinated under one clear process — from early design direction and material planning through structural execution and final detailing. We work with homeowners across Canada to deliver spaces that feel elevated, efficient, and built with long-term value in mind.",
        },
        {
          _key: "services-features-1",
          _type: "featureListSection",
          eyebrow: "Why Brilliance Studio",
          heading: "What sets our renovation services apart.",
          items: [
            "Integrated design and build coordination under one team",
            "Premium material selections and refined finish detailing",
            "Transparent project planning with realistic timelines",
            "Dedicated focus on craftsmanship and quality at every phase",
          ],
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
            imageAlt: "Custom home design and build",
            sortOrder: 1,
          },
          {
            slug: "home-additions",
            eyebrow: "Expansion",
            title: "Home Additions",
            description:
              "Integrated home additions designed to expand space and preserve architectural continuity.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Home additions",
            sortOrder: 2,
          },
          {
            slug: "kitchen-remodeling",
            eyebrow: "Remodeling",
            title: "Kitchen Remodeling",
            description:
              "Kitchen renovations focused on flow, material quality, and polished everyday performance.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Kitchen remodeling",
            sortOrder: 3,
          },
          {
            slug: "bathroom-remodeling",
            eyebrow: "Remodeling",
            title: "Bathroom Remodeling",
            description:
              "High-end bathroom upgrades shaped around comfort, durability, and elegant detailing.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Bathroom remodeling",
            sortOrder: 4,
          },
          {
            slug: "interior-exterior-design",
            eyebrow: "Design",
            title: "Interior & Exterior Design",
            description:
              "Unified design direction for interior and exterior spaces with premium visual clarity.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Interior and exterior design",
            sortOrder: 5,
          },
          {
            slug: "structural-modifications-framing",
            eyebrow: "Structure",
            title: "Structural Modifications & Framing",
            description:
              "Precise structural and framing work that supports safe, design-led renovation.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Structural modifications and framing",
            sortOrder: 6,
          },
          {
            slug: "basement-finishing",
            eyebrow: "Lower Level",
            title: "Basement Finishing",
            description:
              "Finished basement spaces designed for comfort, function, and long-term value.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Basement finishing",
            sortOrder: 7,
          },
        ],
      },
    },
  });

  await prisma.referencePage.upsert({
    where: { slug: "references" },
    update: {
      eyebrow: "Portfolio",
      title: "Our Portfolio",
      description:
        "Explore our renovation and design projects across Canada — crafted with precision, premium materials, and a refined eye for detail.",
      seoTitle: "Renovation & Interior Design Portfolio | Brilliance Studio Canada",
      seoDescription:
        "Explore curated Canadian residential renovations and high-end interiors — custom homes, kitchens, baths, additions, basements, and structural transformations.",
      primaryCtaLabel: "Discuss your project",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Meet the studio",
      secondaryCtaHref: "/about",
      sections: [
        {
          _key: "references-text-1",
          _type: "textSection",
          eyebrow: "Craftsmanship",
          heading: "Craftsmanship and transformation in focus.",
          body: "Our portfolio highlights renovation and design work shaped by precision, craftsmanship, and a modern understanding of how people want to live. Each project is presented as a study in thoughtful transformation, refined finishes, and high-end execution.",
        },
        {
          _key: "references-features-1",
          _type: "featureListSection",
          eyebrow: "What We Deliver",
          heading: "Every project shaped by the same high standard.",
          items: [
            "Precise structural and construction execution across all phases",
            "Premium materials selected for durability and refined aesthetics",
            "Design coordination that keeps visual consistency through the build",
            "Clear communication and planning that protects timeline and quality",
          ],
        },
      ],
      items: {
        deleteMany: {},
        create: [
          {
            slug: "whole-home-renovation",
            category: "Custom Home",
            title: "Whole-Home Renovation",
            summary:
              "A complete whole-home transformation — structural modifications, open-concept redesign, premium finishes, and precise coordination from concept through completion.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Whole-home renovation project",
            sortOrder: 1,
          },
          {
            slug: "kitchen-open-concept-remodel",
            category: "Kitchen Renovation",
            title: "Kitchen & Open-Concept Remodel",
            summary:
              "Load-bearing wall removal, custom cabinetry, quartz countertops, and a seamless connection between kitchen, dining, and living spaces.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Kitchen and open-concept remodel project",
            sortOrder: 2,
          },
          {
            slug: "primary-bathroom-transformation",
            category: "Bathroom Renovation",
            title: "Primary Bathroom Transformation",
            summary:
              "A spa-inspired primary bathroom with heated floors, custom tile work, freestanding soaker tub, and refined fixtures selected for durability and luxury feel.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Primary bathroom renovation project",
            sortOrder: 3,
          },
        ],
      },
    },
    create: {
      slug: "references",
      eyebrow: "Portfolio",
      title: "Our Portfolio",
      description:
        "Explore our renovation and design projects across Canada — crafted with precision, premium materials, and a refined eye for detail.",
      seoTitle: "Renovation & Interior Design Portfolio | Brilliance Studio Canada",
      seoDescription:
        "Explore curated Canadian residential renovations and high-end interiors — custom homes, kitchens, baths, additions, basements, and structural transformations.",
      primaryCtaLabel: "Discuss your project",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Meet the studio",
      secondaryCtaHref: "/about",
      sections: [
        {
          _key: "references-text-1",
          _type: "textSection",
          eyebrow: "Craftsmanship",
          heading: "Craftsmanship and transformation in focus.",
          body: "Our portfolio highlights renovation and design work shaped by precision, craftsmanship, and a modern understanding of how people want to live. Each project is presented as a study in thoughtful transformation, refined finishes, and high-end execution.",
        },
        {
          _key: "references-features-1",
          _type: "featureListSection",
          eyebrow: "What We Deliver",
          heading: "Every project shaped by the same high standard.",
          items: [
            "Precise structural and construction execution across all phases",
            "Premium materials selected for durability and refined aesthetics",
            "Design coordination that keeps visual consistency through the build",
            "Clear communication and planning that protects timeline and quality",
          ],
        },
      ],
      items: {
        create: [
          {
            slug: "whole-home-renovation",
            category: "Custom Home",
            title: "Whole-Home Renovation",
            summary:
              "A complete whole-home transformation — structural modifications, open-concept redesign, premium finishes, and precise coordination from concept through completion.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Whole-home renovation project",
            sortOrder: 1,
          },
          {
            slug: "kitchen-open-concept-remodel",
            category: "Kitchen Renovation",
            title: "Kitchen & Open-Concept Remodel",
            summary:
              "Load-bearing wall removal, custom cabinetry, quartz countertops, and a seamless connection between kitchen, dining, and living spaces.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Kitchen and open-concept remodel project",
            sortOrder: 2,
          },
          {
            slug: "primary-bathroom-transformation",
            category: "Bathroom Renovation",
            title: "Primary Bathroom Transformation",
            summary:
              "A spa-inspired primary bathroom with heated floors, custom tile work, freestanding soaker tub, and refined fixtures selected for durability and luxury feel.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Primary bathroom renovation project",
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
      title: "Terms of Service & Privacy",
      description:
        "Service terms, project agreements, payment conditions, warranty commitments, and privacy standards for Brilliance Studio — prepared for Canadian renovation and design operations.",
      seoTitle: "Terms of Service & Privacy | Brilliance Studio Canada",
      seoDescription:
        "Terms of service for Brilliance Studio renovation and design services in Canada — covering project scope, payments, permits, warranties, holdbacks, and PIPEDA-aligned privacy commitments.",
      sections: [
        {
          _key: "terms-1",
          eyebrow: "Services",
          heading: "Scope of Services",
          body: "Brilliance Studio provides residential renovation, interior and exterior design, design-build coordination, structural modifications, and related construction services across Canada. Each project is governed by a written proposal or statement of work that defines the scope, phases, materials, timelines, and completion criteria.\n\nAll services are performed in accordance with applicable provincial building codes, the National Building Code of Canada (NBC), and local municipal requirements.",
          listItems: [
            "Project scope, phases, and deliverables must be agreed in writing prior to construction start.",
            "Change requests, material substitutions, or additions to scope require a written change order.",
            "Client selections, approvals, site access, and permit readiness directly affect construction timelines.",
            "Licensed subcontractors may be engaged for specialized trades including electrical, plumbing, HVAC, and structural work.",
          ],
        },
        {
          _key: "terms-2",
          eyebrow: "Payment",
          heading: "Payment Schedule, Holdback, and Change Orders",
          body: "Renovation projects are invoiced on a milestone basis. A deposit is required before project mobilization, with progress payments tied to defined construction phases. The final payment is due upon substantial completion and client sign-off.\n\nIn accordance with provincial construction lien legislation — including Ontario's Construction Act — a statutory holdback of 10% of the value of services and materials may be retained by the owner until the holdback release period has expired.",
          listItems: [
            "Deposit amount and milestone payment schedule are defined in each project proposal.",
            "All pricing is in Canadian dollars (CAD) and excludes applicable taxes (HST/GST) unless stated otherwise.",
            "The statutory holdback period under applicable provincial construction legislation must expire before final holdback release.",
            "Brilliance Studio reserves the right to pause work if invoices remain unpaid beyond the agreed terms.",
          ],
        },
        {
          _key: "terms-3",
          eyebrow: "Privacy",
          heading: "Personal Information and PIPEDA Compliance",
          body: "Brilliance Studio collects personal information solely for the purposes of responding to inquiries, preparing estimates, delivering contracted services, and maintaining business records.\n\nBrilliance Studio operates in a manner consistent with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation. Personal information is not sold, rented, or disclosed to third parties except as required to deliver services or as required by law.",
          listItems: [
            "Information is collected only to the extent necessary for the purpose stated at collection.",
            "Reasonable technical and organizational safeguards are maintained to protect personal data.",
            "Clients may request access to, correction of, or deletion of their personal information at any time.",
            "Personal information is retained only as long as required for business, legal, or tax purposes.",
          ],
          note: "This page provides a general legal foundation for Canadian residential renovation operations. It is not a substitute for advice from a qualified Canadian lawyer.",
        },
        {
          _key: "terms-4",
          eyebrow: "Privacy",
          heading: "Consent, Access, and Contact",
          body: "By submitting an inquiry through the Brilliance Studio website, you consent to Brilliance Studio using your contact information to respond to your request and to follow up regarding your renovation project. You may withdraw consent at any time by contacting us directly.",
          contactItems: [
            {
              label: "General inquiries",
              value: "info@brilliancestudio.ca",
              href: "mailto:info@brilliancestudio.ca",
            },
          ],
        },
      ],
    },
    {
      slug: "impressum",
      eyebrow: "Legal",
      title: "Imprint & Legal Disclosure",
      description:
        "Business registration details, regulatory disclosures, and privacy contact information for Brilliance Studio — operating as a home renovation and design company in Canada.",
      seoTitle: "Imprint & Legal Disclosure | Brilliance Studio Canada",
      seoDescription:
        "Legal disclosure, business registration, tax numbers, WSIB information, and privacy contact details for Brilliance Studio — a Canadian home renovation and design company.",
      sections: [
        {
          _key: "impressum-1",
          eyebrow: "Business Identity",
          heading: "Registered Business Information",
          body: "The following information identifies the legal entity responsible for operating the Brilliance Studio website and providing renovation and design services in Canada.",
          contactItems: [
            {
              label: "Legal business name",
              value: "Brilliance Studio",
            },
            {
              label: "Province of registration",
              value: "Ontario, Canada",
            },
            {
              label: "Mailing address",
              value: "[Street address, City, Province, Postal Code, Canada]",
            },
            {
              label: "Email",
              value: "info@brilliancestudio.ca",
              href: "mailto:info@brilliancestudio.ca",
            },
            {
              label: "Website",
              value: "https://brilliancestudio.ca",
              href: "https://brilliancestudio.ca",
            },
          ],
        },
        {
          _key: "impressum-2",
          eyebrow: "Tax & Registration",
          heading: "CRA Business Number and HST/GST Registration",
          body: "All applicable taxes will be itemized separately on project invoices in accordance with CRA requirements.",
          contactItems: [
            {
              label: "CRA Business Number (BN)",
              value: "[9-digit CRA Business Number]",
            },
            {
              label: "HST / GST Registration Number",
              value: "[BN followed by RT0001]",
            },
          ],
        },
        {
          _key: "impressum-3",
          eyebrow: "Privacy",
          heading: "Privacy Officer and PIPEDA Contact",
          body: "Individuals may submit requests to access, correct, or delete their personal information, withdraw consent, or raise privacy concerns by contacting the Privacy Officer directly.",
          contactItems: [
            {
              label: "General inquiries",
              value: "info@brilliancestudio.ca",
              href: "mailto:info@brilliancestudio.ca",
            },
            {
              label: "Federal Privacy Commissioner",
              value: "www.priv.gc.ca",
              href: "https://www.priv.gc.ca",
            },
          ],
          note: "If you are not satisfied with our response to a privacy concern, you may file a complaint with the Office of the Privacy Commissioner of Canada at www.priv.gc.ca.",
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
        company: null,
        message:
          "We are planning a full custom home build and would like to discuss scope, timeline, and design direction.",
      },
      {
        name: "Luca Hartmann",
        email: "luca@example.com",
        service: "Kitchen Remodeling",
        company: null,
        message:
          "Looking to open up our kitchen into the dining area and upgrade finishes throughout. Interested in a consultation.",
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
