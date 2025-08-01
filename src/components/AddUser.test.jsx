import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import AddUser from "./AddUser";
import { UsersProvider } from "../context/UsersContext";
import { MemoryRouter } from "react-router-dom";

describe("AddUser", () => {
  it("renders the add user form", () => {
    render(
      <MemoryRouter>
        <UsersProvider>
          <AddUser />
        </UsersProvider>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it("shows validation errors on submit", async () => {
    render(
      <MemoryRouter>
        <UsersProvider>
          <AddUser />
        </UsersProvider>
      </MemoryRouter>
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /add user/i }));
    });

    // Directly check for error message in the DOM
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    });
  });
});
