import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginScreen from "../Login"; // Adjust the import path accordingly
import LoginOtp from "../LoginOtp";

describe("login process test", () => {
  beforeAll(() => {
    // Wait for state changes to be reflected in the UI
    // You can add more assertions as needed based on your component's behavior
  });

  test("Login step 1", () => {
    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    );

    const userInput = screen.getByTestId("company-email-input");
    const passwordInput = screen.getByTestId("password-input");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    fireEvent.change(userInput, { target: { value: "mohit" } });
    expect(userInput.value).toBe("mohit");
    fireEvent.change(passwordInput, { target: { value: "mohit@1501" } });
    expect(passwordInput.value).toBe("mohit@1501");
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
    fireEvent.click(button);
  });
  test("Login step 2(2FA) ", async () => {
    render(
      <MemoryRouter>
        <LoginOtp />
      </MemoryRouter>
    );

    const tfaScreenText = screen.getByText(/Enter the five-digit code below/i);
    expect(tfaScreenText).toBeInTheDocument();

    // const userInput = screen.getByTestId("company-email-input");
    // const passwordInput = screen.getByTestId("password-input");
    // const checkbox = screen.getByRole("checkbox");
    // const button = screen.getByRole("button");

    // You can add more assertions as needed based on your component's behavior
  });
});
