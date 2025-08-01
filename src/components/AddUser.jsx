import React from "react";
import { useState } from "react";
import { TextField, Button, Box, Paper, Alert } from "@mui/material";
import { UserPlus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";

function AddUser() {
  const navigate = useNavigate();
  const { addUser } = useUsers();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone") {
      // Only allow digits, spaces, dashes, parentheses, and +
      newValue = newValue.replace(/[^0-9\s\-()+]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website is required";
    } else if (!/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website =
        "Please enter a valid website URL (include http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addUser(formData);

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          username: "",
          email: "",
          phone: "",
          website: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrors({
          submit: result.error || "Failed to add user. Please try again.",
        });
      }
    } catch (error) {
      setErrors({ submit: "Failed to add user. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4 md:p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-8">
            <Button
              onClick={() => navigate("/")}
              startIcon={<ArrowLeft />}
              variant="outlined"
              sx={{ mr: 2 }}
            >
              Back to Users
            </Button>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Add New User
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Fill in the form below to add a new user to the system
          </p>
        </div>

        {/* Form Card */}
        <Paper elevation={3} className="p-4 sm:p-6 md:p-8">
          {submitSuccess && (
            <Alert severity="success" className="mb-4">
              User added successfully! Redirecting to users list...
            </Alert>
          )}

          {errors.submit && (
            <Alert severity="error" className="mb-4">
              {errors.submit}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                required
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
                required
                variant="outlined"
              />
            </div>

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              variant="outlined"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
                required
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                error={!!errors.website}
                helperText={errors.website}
                required
                variant="outlined"
                placeholder="https://example.com"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<UserPlus />}
                disabled={isSubmitting}
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                {isSubmitting ? "Adding User..." : "Add User"}
              </Button>

              <Button
                type="button"
                variant="outlined"
                size="large"
                onClick={() => navigate("/")}
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </Paper>
      </div>
    </div>
  );
}

export default AddUser;
