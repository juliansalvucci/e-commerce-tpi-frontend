import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Collapse, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import ListIcon from '@mui/icons-material/List';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';

const NavBar = () => {
  const navbarStyle = {
    backgroundColor: "#00203D",
  };

  const linkStyle = {
    color: "#C2E1FF",
    textDecoration: "none",
  };

  const [opacity, setOpacity] = useState(1);
  const [open, setOpen] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 200;
      const newOpacity = Math.max(1 - scrollY / maxScroll, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleToggleBrand = () => {
    setOpenBrand(!openBrand);
  };

  const handleToggleCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleToggleProduct = () => {
    setOpenProduct(!openProduct);
  };

  const handleToggleSubCategory = () => {
    setOpenSubCategory(!openSubCategory);
  };

  return (
    <AppBar position="static" style={{ ...navbarStyle, opacity }}>
      <Toolbar>
        <Typography variant="h6" style={linkStyle}>
          <NavLink to="/admin" style={linkStyle}>
            MegaStore
          </NavLink>
        </Typography>

        <Box display="flex" justifyContent="space-evenly" alignItems="center" flexGrow={1}>
          <div>
            <Button color="inherit" startIcon={<ListIcon />} onClick={handleToggle}>
              Administración
            </Button>
            <Collapse in={open}>
              <List>
                <ListItem button component={NavLink} style={linkStyle} onClick={handleToggleBrand}>
                  <ListItemText primary="Brand" />
                </ListItem>
                <Collapse in={openBrand}>
                  <List component="div" disablePadding>
                    <ListItem button component={NavLink} to="/admin/brand/create" style={linkStyle}>
                      <ListItemText primary="Create" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/brand/list" style={linkStyle}>
                      <ListItemText primary="List" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem button component={NavLink} style={linkStyle} onClick={handleToggleCategory}>
                  <ListItemText primary="Category" />
                </ListItem>
                <Collapse in={openCategory}>
                  <List component="div" disablePadding>
                    <ListItem button component={NavLink} to="/admin/category/create" style={linkStyle}>
                      <ListItemText primary="Create" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/category/list" style={linkStyle}>
                      <ListItemText primary="List" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem button component={NavLink} style={linkStyle} onClick={handleToggleProduct}>
                  <ListItemText primary="Product" />
                </ListItem>
                <Collapse in={openProduct}>
                  <List component="div" disablePadding>
                    <ListItem button component={NavLink} to="/admin/product/create" style={linkStyle}>
                      <ListItemText primary="Create" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/product/list" style={linkStyle}>
                      <ListItemText primary="List" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem button component={NavLink} style={linkStyle} onClick={handleToggleSubCategory}>
                  <ListItemText primary="Subcategory" />
                </ListItem>
                <Collapse in={openSubCategory}>
                  <List component="div" disablePadding>
                    <ListItem button component={NavLink} to="/admin/subcategory/create" style={linkStyle}>
                      <ListItemText primary="Create" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/admin/subcategory/list" style={linkStyle}>
                      <ListItemText primary="List" />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </Collapse>
          </div>

          <Button color="inherit" startIcon={<AssessmentIcon />}>Reportes</Button>
          <Button color="inherit" startIcon={<Inventory2Icon />}>Stock</Button>
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Button color="inherit" startIcon={<PersonIcon />}>Usuario</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
