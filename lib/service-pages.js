const servicePages = [
  {
    slug: "custom-home-design-build",
    title: "Custom Home Design & Build",
    icon: "home",
    subtitle: "We design. We build. We transform.",
    description: [
      "Our custom home design and build service is created for clients who want a residence shaped with intention from the earliest concept through final execution. We coordinate design thinking, material direction, and construction planning so the finished home feels cohesive, elevated, and deeply personal.",
      "Every phase is guided by quality, precision, and efficiency. The result is a high-end build process that protects design integrity, manages complexity with clarity, and delivers a home that performs beautifully for everyday life in Canada.",
    ],
    benefits: [
      "Integrated design and construction under one clear vision",
      "Refined planning that reduces friction during execution",
      "Premium craftsmanship with disciplined project coordination",
      "A custom result tailored to lifestyle, function, and long-term value",
    ],
    metaDescription:
      "Custom home design and build services in Canada with premium renovation planning, refined design, and precise execution.",
  },
  {
    slug: "home-additions",
    title: "Home Additions",
    icon: "plus",
    subtitle: "We design. We build. We transform.",
    description: [
      "Home additions require more than extra square footage. They require thoughtful integration so the new space feels natural, proportionate, and aligned with the character of the existing home. We plan additions with a focus on seamless transitions, structural integrity, and architectural consistency.",
      "From early design direction to the final build phase, we prioritize precision, efficiency, and high-end detailing to create expanded living spaces that support both daily function and long-term property value in Canada.",
    ],
    benefits: [
      "Additional living space designed to feel naturally integrated",
      "Coordinated structural and finish planning from the start",
      "Efficient execution that protects timeline and design quality",
      "A premium expansion that adds comfort, function, and value",
    ],
    metaDescription:
      "Home addition services in Canada with premium renovation design, precise construction, and seamless integration.",
  },
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling",
    icon: "utensils",
    subtitle: "We design. We build. We transform.",
    description: [
      "A kitchen remodel should improve the way the home works while elevating its overall character. We design and build kitchens that balance layout efficiency, durable materials, and refined visual clarity, creating spaces that feel calm, practical, and distinctly high-end.",
      "Our process is shaped by quality craftsmanship and disciplined coordination, helping clients move from outdated or inefficient kitchens to spaces that support cooking, gathering, and everyday living with ease in Canada.",
    ],
    benefits: [
      "Improved flow, storage, and functional efficiency",
      "Premium material selections and refined finish detailing",
      "A cleaner, more modern kitchen tailored to daily use",
      "Well-managed renovation execution with design continuity",
    ],
    metaDescription:
      "Kitchen remodeling services in Canada with premium renovation design, efficient layouts, and precise craftsmanship.",
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    icon: "bath",
    subtitle: "We design. We build. We transform.",
    description: [
      "Bathroom remodeling is about combining comfort, performance, and visual refinement in one of the most frequently used spaces in the home. We create bathrooms that feel composed and luxurious while remaining practical, durable, and easy to maintain.",
      "From layout changes and fixture planning to finishes and final detailing, we work with precision and efficiency so every element supports both everyday comfort and lasting renovation value in Canada.",
    ],
    benefits: [
      "Improved comfort, usability, and spatial flow",
      "Elegant finishes selected for durability and daily performance",
      "Design and build decisions coordinated with precision",
      "A polished, high-end result that lifts the feel of the home",
    ],
    metaDescription:
      "Bathroom remodeling services in Canada with premium renovation design, precise detailing, and efficient execution.",
  },
  {
    slug: "interior-exterior-design",
    title: "Interior & Exterior Design",
    icon: "pencil",
    subtitle: "We design. We build. We transform.",
    description: [
      "Interior and exterior design shape how a home is experienced before any build work begins. We develop clear visual direction for both inside and outside spaces, aligning form, materials, proportion, and atmosphere into one coherent design language.",
      "This service supports renovation decisions with precision and clarity, helping clients move forward confidently while preserving a premium standard of quality and efficiency throughout the design process in Canada.",
    ],
    benefits: [
      "A unified design vision across interior and exterior spaces",
      "Better material and finish decisions before construction begins",
      "Clearer direction that improves renovation efficiency",
      "Refined visual consistency that elevates the entire property",
    ],
    metaDescription:
      "Interior and exterior design services in Canada with premium renovation planning, refined aesthetics, and efficient execution.",
  },
  {
    slug: "structural-modifications-framing",
    title: "Structural Modifications & Framing",
    icon: "hammer",
    subtitle: "We design. We build. We transform.",
    description: [
      "Structural modifications and framing work create the foundation for safe, successful transformation. Whether the goal is opening up space, reworking layouts, or preparing for a major renovation, we approach structural phases with exacting attention to quality, alignment, and build readiness.",
      "Precision matters most when the work is hidden behind finished surfaces. Our team focuses on efficient execution and disciplined craftsmanship so the entire renovation can progress with confidence and clarity in Canada.",
    ],
    benefits: [
      "Accurate structural work that supports premium final finishes",
      "Improved confidence in layout changes and build sequencing",
      "Efficient preparation for follow-on trades and detailing",
      "Craftsmanship that balances safety, precision, and momentum",
    ],
    metaDescription:
      "Structural modification and framing services in Canada with precise renovation execution, design support, and quality construction.",
  },
  {
    slug: "basement-finishing",
    title: "Basement Finishing",
    icon: "layers",
    subtitle: "We design. We build. We transform.",
    description: [
      "We turn underused lower levels into polished, highly functional living environments that feel fully connected to the rest of the home. From layout flow and lighting to finishes and detailing, every decision is made to improve comfort, usability, and value.",
      "Our approach emphasizes efficiency in planning and precision in execution so basement spaces are not treated as secondary areas, but as premium extensions of the home suited to modern living in Canada.",
    ],
    benefits: [
      "Better use of square footage without compromising design quality",
      "Improved comfort, lighting, and everyday functionality",
      "Efficient coordination for smooth renovation delivery",
      "High-end finishes that elevate below-grade living spaces",
    ],
    metaDescription:
      "Basement finishing services in Canada with premium renovation quality, efficient planning, and design-led execution.",
  },
];

const servicePagesBySlug = Object.fromEntries(
  servicePages.map((service) => [service.slug, service]),
);

const serviceOptions = servicePages.map((service) => ({
  label: service.title,
  value: service.title,
}));

const serviceNavItems = servicePages.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}`,
  icon: service.icon,
}));

export { serviceNavItems, serviceOptions, servicePages, servicePagesBySlug };
