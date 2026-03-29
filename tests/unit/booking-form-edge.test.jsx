import { fireEvent, render } from "@testing-library/react";

import BookingPage from "@/pages/booking";

jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

jest.mock("@/components/fade-in-section", () => ({
  FadeInSection: ({ children }) => <>{children}</>,
}));

jest.mock("@/components/page-intro", () => ({
  PageIntro: ({ title }) => <div data-testid="page-intro">{title}</div>,
}));

jest.mock("@/components/button", () => ({
  Button: ({ children, type, disabled, href, variant, ...rest }) =>
    href ? (
      <a href={href} data-variant={variant}>
        {children}
      </a>
    ) : (
      <button type={type} disabled={disabled} {...rest}>
        {children}
      </button>
    ),
}));

jest.mock("@/components/ui/DatePicker", () => ({
  DatePicker: ({ onChange }) => (
    <button
      type="button"
      data-testid="inject-past-date"
      onClick={() => {
        const past = new Date();
        past.setDate(past.getDate() - 14);
        onChange(past);
      }}
    >
      Inject past date
    </button>
  ),
}));

describe("booking form edge cases", () => {
  it("rejects a past preferred date before calling the API", () => {
    const fetchMock = jest.fn();
    global.fetch = fetchMock;

    const { container, getByTestId, getByRole, getByText } =
      render(<BookingPage />);

    fireEvent.change(container.querySelector('input[placeholder="Your name"]'), {
      target: { name: "name", value: "Edge Case" },
    });
    fireEvent.change(
      container.querySelector('input[placeholder="name@example.com"]'),
      {
        target: { name: "email", value: "edge@example.com" },
      },
    );
    fireEvent.change(
      container.querySelector(
        'input[placeholder="Website design, redesign, brand site..."]',
      ),
      { target: { name: "service", value: "Consultation" } },
    );

    fireEvent.click(getByTestId("inject-past-date"));
    fireEvent.click(getByRole("button", { name: /send booking/i }));

    expect(
      getByText("Please choose today or a future date."),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
