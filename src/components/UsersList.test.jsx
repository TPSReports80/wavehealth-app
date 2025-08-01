import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UsersList from "./UsersList";

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    username: "alice",
    phone: "123",
    website: "alice.com",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    username: "bob",
    phone: "456",
    website: "bob.com",
  },
];

jest.mock("../context/UsersContext", () => ({
  useUsers: () => ({
    users: mockUsers,
    loading: false,
    error: null,
  }),
}));

describe("UsersList", () => {
  it("renders the users table", () => {
    render(<UsersList />);
    expect(screen.getByText("Users Directory")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("filters users by search", () => {
    render(<UsersList />);
    const searchInput = screen.getByPlaceholderText(/search by name or email/i);
    fireEvent.change(searchInput, { target: { value: "alice" } });
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });
});
