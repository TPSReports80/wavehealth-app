import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { X } from "lucide-react";

function UserDetailsModal({ open, onClose, user }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
      role="dialog"
      aria-modal="true"
      sx={{
        backdropFilter: "blur(2px)",
        backgroundColor: "rgba(0, 0, 0, 0.25)", // slate-800/25
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: 400, md: 450 },
          maxWidth: "95vw",
          bgcolor: "background.paper",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          p: 0,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {user && (
          <>
            {/* Accent bar and close button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "primary.main",
                color: "white",
                px: 2,
                py: 1.5,
              }}
            >
              <Typography
                id="user-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: 600, fontSize: { xs: 18, sm: 20 } }}
              >
                User Details
              </Typography>
              <IconButton
                onClick={onClose}
                sx={{ color: "white" }}
                aria-label="Close modal"
              >
                <X size={24} />
              </IconButton>
            </Box>
            <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Name:
                  </Typography>
                  <Typography variant="body1" className="text-gray-900">
                    {user.name}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Username:
                  </Typography>
                  <Typography variant="body1" className="text-gray-900">
                    {user.username}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email:
                  </Typography>
                  <Typography variant="body1" className="text-gray-900">
                    {user.email}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone:
                  </Typography>
                  <Typography variant="body1" className="text-gray-900">
                    {user.phone}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Website:
                  </Typography>
                  <Typography variant="body1" className="text-gray-900">
                    {user.website}
                  </Typography>
                </div>
              </div>
              <Button
                onClick={onClose}
                variant="contained"
                fullWidth
                sx={{ mt: 4, fontWeight: 600, py: 1.2, borderRadius: 2 }}
              >
                Close
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default UserDetailsModal;
