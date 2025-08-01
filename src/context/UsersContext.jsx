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
  const [initialUsers, setInitialUsers] = useState(0);
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
      setInitialUsers(data.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const value = {
    initialUsers,
    users,
    loading,
    error,
    addUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
