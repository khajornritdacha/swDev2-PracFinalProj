import { render, screen } from "@testing-library/react";
import StyledButton from "@/components/StyledButton";

describe("Simple", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });
});

describe("StyledButton", () => {
  it("should render correctly", () => {
    // Arrange
    render(<StyledButton> Click me </StyledButton>);

    // Act
    const text = screen.getByText("Click me");

    // Assert
    expect(text).toBeInTheDocument();
  });
});
