import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Unable to fetch users. Try again later.");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userData,
            id: Date.now(),
          }),
        }
      );

      if (response.ok) {
        const newUser = {
          ...userData,
          id: Date.now(),
        };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        return { success: true };
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const value = {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
