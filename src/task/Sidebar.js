
import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";

const Sidebar = () => {
  return (
    <div style={{ width: 250, backgroundColor: "#f5f7fa", height: "100vh", padding: "20px" }}>
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
