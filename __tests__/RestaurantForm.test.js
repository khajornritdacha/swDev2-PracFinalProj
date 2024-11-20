import { fireEvent, render, screen } from "@testing-library/react";
import RestaurantForm from "../src/components/RestaurantForm";

// Mock axios and alert
jest.mock("axios");
global.alert = jest.fn();

describe("RestaurantForm", () => {
  const mockOnSubmit = jest.fn();
  const mockToken = "mock-token";

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form fields correctly", () => {
    render(<RestaurantForm onSubmit={mockOnSubmit} token={mockToken} />);

    // Check form fields
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Picture Link/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cuisine/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Province/i)).toBeInTheDocument();

    // Check submit button
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("validates phone number and postal code", () => {
    render(<RestaurantForm onSubmit={mockOnSubmit} token={mockToken} />);
    fireEvent.change(screen.getByLabelText(/Postal Code/i), {
      target: { value: "12345" },
    });
    // Invalid phone number
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "123" },
    });
    fireEvent.blur(screen.getByLabelText(/Phone Number/i));
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue("123");
    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "0000000000" },
    });

    // Invalid postal code
    fireEvent.change(screen.getByLabelText(/Postal Code/i), {
      target: { value: "1234" },
    });
    fireEvent.blur(screen.getByLabelText(/Postal Code/i));
    expect(screen.getByLabelText(/Postal Code/i)).toHaveValue("1234");
    expect(screen.getByText(/Invalid input/i)).toBeInTheDocument();
  });

  test("pre-fills form with initial data for edit mode", () => {
    const initialData = {
      name: "Initial Restaurant",
      tel: "9876543210",
      address: "456 Initial Ave.",
      postalcode: "54321",
      province: "Chiang Mai",
      foodtype: "Japanese",
      picture: "http://example.com/initial.jpg",
    };

    render(
      <RestaurantForm
        onSubmit={mockOnSubmit}
        token={mockToken}
        initialData={initialData}
      />
    );

    // Check pre-filled fields
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue(initialData.name);
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue(initialData.tel);
    expect(screen.getByLabelText(/Address/i)).toHaveValue(initialData.address);
    expect(screen.getByLabelText(/Postal Code/i)).toHaveValue(
      initialData.postalcode
    );
    expect(screen.getByLabelText(/Cuisine/i)).toHaveValue(initialData.foodtype);
    expect(screen.getByLabelText(/Province/i)).toHaveValue(
      initialData.province
    );
    expect(screen.getByLabelText(/Picture Link/i)).toHaveValue(
      initialData.picture
    );
  });
});
