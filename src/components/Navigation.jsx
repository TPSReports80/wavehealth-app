import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Users, UserPlus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/wavehealth-logo.png";
function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
    >
      <Toolbar className="flex justify-between">
        <img
          src={logo}
          alt="wave health logo"
          className="md:w-[200px] w-[100px]"
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<Users />}
            onClick={() => navigate("/")}
            sx={{
              color: location.pathname === "/" ? "primary.main" : "#374151",
              fontWeight: location.pathname === "/" ? 600 : 500,
              backgroundColor:
                location.pathname === "/"
                  ? "rgba(59, 130, 246, 0.1)"
                  : "transparent",
              border:
                location.pathname === "/"
                  ? "1px solid rgba(59, 130, 246, 0.2)"
                  : "1px solid transparent",
              borderRadius: 2,
              px: 2,
              py: 1,
              "&:hover": {
                backgroundColor:
                  location.pathname === "/"
                    ? "rgba(59, 130, 246, 0.15)"
                    : "rgba(0, 0, 0, 0.04)",
                border:
                  location.pathname === "/"
                    ? "1px solid rgba(59, 130, 246, 0.3)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Users List
          </Button>

          <Button
            color="inherit"
            startIcon={<UserPlus />}
            onClick={() => navigate("/add")}
            sx={{
              color: location.pathname === "/add" ? "primary.main" : "#374151",
              fontWeight: location.pathname === "/add" ? 600 : 500,
              backgroundColor:
                location.pathname === "/add"
                  ? "rgba(59, 130, 246, 0.1)"
                  : "transparent",
              border:
                location.pathname === "/add"
                  ? "1px solid rgba(59, 130, 246, 0.2)"
                  : "1px solid transparent",
              borderRadius: 2,
              px: 2,
              py: 1,
              "&:hover": {
                backgroundColor:
                  location.pathname === "/add"
                    ? "rgba(59, 130, 246, 0.15)"
                    : "rgba(0, 0, 0, 0.04)",
                border:
                  location.pathname === "/add"
                    ? "1px solid rgba(59, 130, 246, 0.3)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Add User
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
