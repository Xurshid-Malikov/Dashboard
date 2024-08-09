// src/components/Sidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <div
      style={{
        width: "20%",
        background: "#f0f0f0",
        padding: "20px",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <List style={{ flexGrow: 1 }}>
        <ListItem button disabled>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate("/products")}>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button disabled>
          <ListItemText primary="Statistics" />
        </ListItem>
        <ListItem button disabled>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <List style={{ marginTop: "auto" }}>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
