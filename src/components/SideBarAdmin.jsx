import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Avatar,
} from "@mui/material";
import {
  Dashboard,
  Store,
  Category,
  SubdirectoryArrowRight,
  ProductionQuantityLimits,
  InsertChart,
  PieChart,
  ShowChart,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Box } from "@mui/system";

const Sidebar = () => {
  const [openBrand, setOpenBrand] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  const handleToggleBrand = () => {
    setOpenBrand(!openBrand);
    if (openCategory) setOpenCategory(false);
    if (openProduct) setOpenProduct(false);
    if (openSubCategory) setOpenSubCategory(false);
  };

  const handleToggleCategory = () => {
    setOpenCategory(!openCategory);
    if (openBrand) setOpenBrand(false);
    if (openProduct) setOpenProduct(false);
    if (openSubCategory) setOpenSubCategory(false);
  };

  const handleToggleProduct = () => {
    setOpenProduct(!openProduct);
    if (openBrand) setOpenBrand(false);
    if (openCategory) setOpenCategory(false);
    if (openSubCategory) setOpenSubCategory(false);
  };

  const handleToggleSubCategory = () => {
    setOpenSubCategory(!openSubCategory);
    if (openBrand) setOpenBrand(false);
    if (openCategory) setOpenCategory(false);
    if (openProduct) setOpenProduct(false);
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "#fff",
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          backgroundColor: "#00203D",
          color: "#fff",
        },
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar
          sx={{ width: 80, height: 80 }}
          src="/path-to-user-photo.jpg"
          alt="User Photo"
        />
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          Nombre Usuario
        </Typography>
        <Typography variant="body2" sx={{ color: "yellow" }}>
          Admin
        </Typography>
      </Box>

      <List>
        <ListItem component={NavLink} to="/admin" style={navLinkStyle}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="DASHBOARD" />
        </ListItem>

        <Typography
          sx={{ paddingLeft: 2, marginTop: 2, marginBottom: 1 }}
          variant="subtitle2"
        >
          Administración
        </Typography>

        {/* Marca */}
        <ListItem button="true" onClick={handleToggleBrand}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <Store />
          </ListItemIcon>
          <ListItemText primary="Marca" />
          {openBrand ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBrand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component={NavLink}
              to="/admin/brand/create"
              style={navLinkStyle}
            >
              <ListItemText primary="Crear" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/brand/list"
              style={navLinkStyle}
            >
              <ListItemText primary="Listado" />
            </ListItem>
          </List>
        </Collapse>

        {/* Categoría */}
        <ListItem button="true" onClick={handleToggleCategory}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Categoría" />
          {openCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component={NavLink}
              to="/admin/category/create"
              style={navLinkStyle}
            >
              <ListItemText primary="Crear" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/category/list"
              style={navLinkStyle}
            >
              <ListItemText primary="Listado" />
            </ListItem>
          </List>
        </Collapse>

        {/* Subcategoría */}
        <ListItem button="true" onClick={handleToggleSubCategory}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <SubdirectoryArrowRight />
          </ListItemIcon>
          <ListItemText primary="Subcategoría" />
          {openSubCategory ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSubCategory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component={NavLink}
              to="/admin/subcategory/create"
              style={navLinkStyle}
            >
              <ListItemText primary="Crear" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/subcategory/list"
              style={navLinkStyle}
            >
              <ListItemText primary="Listado" />
            </ListItem>
          </List>
        </Collapse>

        {/* Producto */}
        <ListItem button="true" onClick={handleToggleProduct}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <ProductionQuantityLimits />
          </ListItemIcon>
          <ListItemText primary="Producto" />
          {openProduct ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProduct} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component={NavLink}
              to="/admin/product/create"
              style={navLinkStyle}
            >
              <ListItemText primary="Crear" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/product/list"
              style={navLinkStyle}
            >
              <ListItemText primary="Listado" />
            </ListItem>
          </List>
        </Collapse>

        <Typography
          sx={{ paddingLeft: 2, marginTop: 2, marginBottom: 1 }}
          variant="subtitle2"
        >
          Reportes
        </Typography>

        <ListItem
          component={NavLink}
          to="/admin/reports/barchart"
          style={navLinkStyle}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <InsertChart />
          </ListItemIcon>
          <ListItemText primary="Bar Chart" />
        </ListItem>

        <ListItem
          component={NavLink}
          to="/admin/reports/piechart"
          style={navLinkStyle}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <PieChart />
          </ListItemIcon>
          <ListItemText primary="Pie Chart" />
        </ListItem>

        <ListItem
          component={NavLink}
          to="/admin/reports/linechart"
          style={navLinkStyle}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <ShowChart />
          </ListItemIcon>
          <ListItemText primary="Line Chart" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
