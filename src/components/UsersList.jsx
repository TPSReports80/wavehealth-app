import React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useUsers } from "../context/UsersContext";
import UserDetailsModal from "./UserDetailsModal";
import StatCard from "./StatCard";

function UsersList() {
  const { users, loading, error } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Define columns for the DataGrid
  const columns = [
    { field: "name", headerName: "Name", width: 200, sortable: true },
    { field: "username", headerName: "Username", width: 150, sortable: true },
    { field: "email", headerName: "Email", width: 250, sortable: true },
    { field: "phone", headerName: "Phone Number", width: 180, sortable: true },
    { field: "website", headerName: "Website", width: 200, sortable: true },
  ];

  // Transform users data to include unique IDs for DataGrid
  const rows = users.map((user, index) => ({
    id: user.id || index,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
  }));

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle row click to open modal
  const handleRowClick = (params) => {
    setSelectedUser(params.row);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (error) {
    return (
      <div className="text-red-500 p-4" aria-live="polite">
        {error}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4 md:p-10 flex items-center justify-center"
      role="main"
    >
      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Users Directory
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Browse and manage user information
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          <StatCard value="Total Users" length={users.length} />
          <StatCard value="Active" length={users.length} />
          <StatCard value="Performance" length="100%" />
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              User Directory
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Click on any row to view detailed information
            </p>
          </div>
          <div className="flex justify-end px-3 sm:px-4 md:px-6 py-4">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
              aria-label="Users search"
            />
          </div>

          {!loading && users.length > 0 ? (
            <div className="w-full border-t border-gray-200 h-[400px] sm:h-[500px] md:h-[600px] ">
              <DataGrid
                rows={filteredRows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                onRowClick={handleRowClick}
                sx={{
                  "& .MuiDataGrid-row": {
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                    },
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                    fontWeight: 600,
                  },
                  "& .MuiDataGrid-cell": {
                    fontSize: "0.875rem",
                    "@media (max-width: 640px)": {
                      fontSize: "0.75rem",
                    },
                  },
                  "& .MuiDataGrid-columnHeader": {
                    fontSize: "0.875rem",
                    "@media (max-width: 640px)": {
                      fontSize: "0.75rem",
                    },
                  },
                  border: "none",
                }}
                aria-label="Users table"
              />
            </div>
          ) : (
            <div
              className="flex items-center justify-center py-8 sm:py-12"
              aria-live="polite"
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500 mx-auto mb-3 sm:mb-4"></div>
                <p className="text-gray-500 text-sm sm:text-lg">
                  {loading ? "Loading users..." : "No users found"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </div>
  );
}

export default UsersList;
