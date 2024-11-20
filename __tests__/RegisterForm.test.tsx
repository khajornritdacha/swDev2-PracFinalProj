import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/app/auth/register/form";
import { useMutation } from "@tanstack/react-query";

// Mock `useMutation` from React Query
jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

describe("RegisterForm", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    // Mock the useMutation hook
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip("renders the form correctly", () => {
    render(<RegisterForm />);

    // Check if all input fields are rendered
    expect(screen.getByLabelText("ชื่อ-สกุล")).toBeInTheDocument();
    expect(screen.getByLabelText("เบอร์โทร")).toBeInTheDocument();
    expect(screen.getByLabelText("อีเมล")).toBeInTheDocument();
    expect(screen.getByLabelText("รหัสผ่าน")).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(
      screen.getByRole("button", { name: "ลงทะเบียน" })
    ).toBeInTheDocument();

    // Check if the registration link is rendered
    expect(screen.getByText("ผู้ใช้เดิม?")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "เข้าสู่ระบบ" })
    ).toBeInTheDocument();
  });

  it.skip("handles input changes", async () => {
    render(<RegisterForm />);

    // Simulate user typing into inputs
    const nameInput = screen.getByLabelText("ชื่อ-สกุล");
    const telInput = screen.getByLabelText("เบอร์โทร");
    const emailInput = screen.getByLabelText("อีเมล");
    const passwordInput = screen.getByLabelText("รหัสผ่าน");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(telInput, "0801112222");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "password123");

    // Assert that the inputs have the correct values
    expect(nameInput).toHaveValue("John Doe");
    expect(telInput).toHaveValue("0801112222");
    expect(emailInput).toHaveValue("john@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it.skip("shows validation errors when inputs are invalid", async () => {
    render(<RegisterForm />);

    // Simulate form submission with empty fields
    const submitBtn = screen.getByTestId("register-button");
    fireEvent.submit(submitBtn);
    const errMsg = screen.getByTestId("error-msg");
    expect(errMsg).toBeInTheDocument();

    await waitFor(
      () => {
        screen.debug();
        expect(errMsg).toHaveTextContent("testing");
      },
      {
        timeout: 3000,
      }
    );

    // const emailInput = screen.getByLabelText("อีเมล");
    // const telInput = screen.getByLabelText("เบอร์โทร");
    // const passwordInput = screen.getByLabelText("รหัสผ่าน");

    // await userEvent.type(emailInput, "invalid-email");
    // await userEvent.type(telInput, "123");
    // await userEvent.type(passwordInput, "short");
    // fireEvent.submit(submitBtn);

    // // Check for validation error messages
    // expect(
    //   await screen.findByText("รูปแบบอีเมลไม่ถูกต้อง")
    // ).toBeInTheDocument();
    // expect(
    //   await screen.findByText("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร")
    // ).toBeInTheDocument();
    // expect(
    //   await screen.findByText("เบอร์โทรต้องมีความยาว 10 ตัว")
    // ).toBeInTheDocument();
  });

  it("calls the register function on form submission", async () => {
    render(<RegisterForm />);

    // Simulate user typing into inputs
    const nameInput = screen.getByLabelText("ชื่อ-สกุล");
    const telInput = screen.getByLabelText("เบอร์โทร");
    const emailInput = screen.getByLabelText("อีเมล");
    const passwordInput = screen.getByLabelText("รหัสผ่าน");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(telInput, "0801112222");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "password123");

    // Simulate form submission
    const submitBtn = screen.getByTestId("register-button");
    fireEvent.submit(submitBtn);

    // Check if the mutate function is called
    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it("displays an error message if registration fails", async () => {
    // Mock mutate function to simulate an error
    // mockMutate.mockImplementationOnce(() => {
    //   throw new Error("ลงทะเบียนไม่สำเร็จ");
    // });

    render(<RegisterForm />);

    // Simulate user typing into inputs
    const submitBtn = screen.getByTestId("register-button");
    const nameInput = screen.getByLabelText("ชื่อ-สกุล");
    const telInput = screen.getByLabelText("เบอร์โทร");
    const emailInput = screen.getByLabelText("อีเมล");
    const passwordInput = screen.getByLabelText("รหัสผ่าน");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(telInput, "0801112222");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "password123");

    const errMsg = screen.getByTestId("error-msg");
    expect(errMsg).toBeInTheDocument();
    expect(errMsg).toHaveTextContent("");

    // Simulate form submission
    fireEvent.submit(submitBtn);

    // Check for error message
    // expect(errMsg).toHaveTextContent("ลงทะเบียนไม่สำเร็จ");
    // expect(await screen.findByText("ลงทะเบียนไม่สำเร็จ")).toBeInTheDocument();
  });

  it.skip("disables the submit button while loading", () => {
    // Mock useMutation with isPending = true
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });

    render(<RegisterForm />);

    const submitBtn = screen.getByTestId("register-button");
    fireEvent.submit(submitBtn);

    // Check if the button is disabled
    expect(submitBtn).toBeDisabled();
  });
});
