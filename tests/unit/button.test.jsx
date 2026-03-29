import { render, screen } from "@testing-library/react";

import { Button } from "@/components/button";

describe("Button", () => {
  it("renders link buttons with the expected text", () => {
    render(<Button href="/services">Explore services</Button>);

    expect(
      screen.getByRole("link", { name: "Explore services" }),
    ).toBeInTheDocument();
  });

  it("includes the accent hover class for ghost buttons", () => {
    render(
      <Button href="/contact" variant="ghost">
        Contact
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Contact" })).toHaveClass(
      "hover:text-accent",
    );
  });
});
