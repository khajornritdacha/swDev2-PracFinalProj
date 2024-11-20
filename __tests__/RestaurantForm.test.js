import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import RestaurantForm from '../src/components/RestaurantForm';

// Mock axios and alert
jest.mock('axios');
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
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });

    test("validates phone number and postal code", () => {
        render(<RestaurantForm onSubmit={mockOnSubmit} token={mockToken} />);

        // Invalid phone number
        fireEvent.change(screen.getByLabelText(/Phone Number/i), {
            target: { value: "123" },
        });
        fireEvent.blur(screen.getByLabelText(/Phone Number/i));
        expect(screen.getByLabelText(/Phone Number/i)).toHaveValue("123");

        // Invalid postal code
        fireEvent.change(screen.getByLabelText(/Postal Code/i), {
            target: { value: "1234" },
        });
        fireEvent.blur(screen.getByLabelText(/Postal Code/i));
        expect(screen.getByLabelText(/Postal Code/i)).toHaveValue("1234");
    });

    test("submitting form calls onSubmit with correct data", async () => {
        const mockOnSubmit = jest.fn(); // Mock the onSubmit function
        const token = "someValidToken"; // Provide a valid token (or mock if necessary)
      
        render(<RestaurantForm onSubmit={mockOnSubmit} token={token} />);
      
        // Fill out the form fields
        fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "Test Restaurant" } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "1234567890" } });
        fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: "Test Address" } });
        fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: "12345" } });
        fireEvent.change(screen.getByLabelText(/Cuisine/i), { target: { value: "African" } });
        fireEvent.change(screen.getByLabelText(/Province/i), { target: { value: "Test Province" } });
        fireEvent.change(screen.getByLabelText(/Picture Link/i), { target: { value: "http://example.com/picture.jpg" } });
      
        // Submit the form by clicking the submit button
        fireEvent.click(screen.getByText(/Submit/i));
      
        // Wait for the onSubmit function to be called with the correct data
        await waitFor(() => {
          expect(mockOnSubmit).toHaveBeenCalledTimes(1);
          expect(mockOnSubmit).toHaveBeenCalledWith({
            name: "Test Restaurant",
            tel: "1234567890",
            address: "Test Address",
            postalcode: "12345",
            province: "Test Province",
            foodtype: "African",
            picture: "http://example.com/picture.jpg",
          });
        });
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
        expect(screen.getByLabelText(/Full Name/i)).toHaveValue(
            initialData.name
        );
        expect(screen.getByLabelText(/Phone Number/i)).toHaveValue(
            initialData.tel
        );
        expect(screen.getByLabelText(/Address/i)).toHaveValue(
            initialData.address
        );
        expect(screen.getByLabelText(/Postal Code/i)).toHaveValue(
            initialData.postalcode
        );
        expect(screen.getByLabelText(/Cuisine/i)).toHaveValue(
            initialData.foodtype
        );
        expect(screen.getByLabelText(/Province/i)).toHaveValue(
            initialData.province
        );
        expect(screen.getByLabelText(/Picture Link/i)).toHaveValue(
            initialData.picture
        );
    });
});
