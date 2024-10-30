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
  ExpandLess,
  ExpandMore,
  SupervisorAccount as SupervisorAccountIcon,
  Add as AddIcon,
  List as ListIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";

const Sidebar = () => {
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  const handleToggleAdmin = () => {
    setOpenAdmin(!openAdmin);
    if (openBrand) setOpenBrand(false);
    if (openCategory) setOpenCategory(false);
    if (openProduct) setOpenProduct(false);
    if (openSubCategory) setOpenSubCategory(false);
    if (openReports) setOpenReports(false);
  };


  const handleToggleBrand = () => {
    setOpenBrand(!openBrand);
    if (openAdmin) setOpenBrand(false);
    if (openCategory) setOpenCategory(false);
    if (openProduct) setOpenProduct(false);
    if (openSubCategory) setOpenSubCategory(false);
    if (openReports) setOpenReports(false);
  };

  const handleToggleCategory = () => {
    setOpenCategory(!openCategory);
    if (openAdmin) setOpenBrand(false);
    if (openBrand) setOpenBrand(false);
    if (openProduct) setOpenProduct(false);
    if (openSubCategory) setOpenSubCategory(false);
    if (openReports) setOpenReports(false);
  };

  const handleToggleProduct = () => {
    setOpenProduct(!openProduct);
    if (openAdmin) setOpenBrand(false);
    if (openBrand) setOpenBrand(false);
    if (openCategory) setOpenCategory(false);
    if (openSubCategory) setOpenSubCategory(false);
    if (openReports) setOpenReports(false);
  };

  const handleToggleSubCategory = () => {
    setOpenSubCategory(!openSubCategory);
    if (openAdmin) setOpenBrand(false);
    if (openBrand) setOpenBrand(false);
    if (openCategory) setOpenCategory(false);
    if (openProduct) setOpenProduct(false);
    if (openReports) setOpenReports(false);
  };

  const handleToggleReports = () => {
    setOpenReports(!openReports);
    if (openAdmin) setOpenBrand(false);
    if (openBrand) setOpenBrand(false);
    if (openCategory) setOpenCategory(false);
    if (openSubCategory) setOpenSubCategory(false);
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
          backgroundColor: "#283b54",
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
          src="/logo.jpg" // Aca iría la imagen del usuario (si es que agregamos)
          alt="Admin"
        />
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          Admin
        </Typography>
        <Typography variant="body2" sx={{ color: "#d7c4ab" }}>
          Admin
        </Typography>
      </Box>

      <List>
        <Typography
          sx={{
            paddingLeft: 2,
            marginTop: 2,
            marginBottom: 1,
            color: "#9e9e9e",
            fontSize: "0.8rem",
            fontStyle: "normal",
          }}
          variant="subtitle2"
        >
          Principal
        </Typography>

        <ListItem component={NavLink} to="/admin" style={navLinkStyle}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <Typography
          sx={{
            paddingLeft: 2,
            marginTop: 2,
            marginBottom: 1,
            color: "#9e9e9e",
            fontSize: "0.8rem",
            fontStyle: "normal",
          }}
          variant="subtitle2"
        >
          Administración
        </Typography>

        {/* Administrador */}
        <ListItem button="true" onClick={handleToggleAdmin}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Administrador" />
          {openAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAdmin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component={NavLink}
              to="/admin/user/create"
              style={navLinkStyle}
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Crear" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/user/list"
              style={navLinkStyle}
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Listado" />
            </ListItem>
          </List>
        </Collapse>

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
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Crear" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/brand/list"
              style={navLinkStyle}
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <ListIcon />
              </ListItemIcon>
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
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Crear" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/category/list"
              style={navLinkStyle}
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <ListIcon />
              </ListItemIcon>
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
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Crear" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/subcategory/list"
              style={navLinkStyle}
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <ListIcon />
              </ListItemIcon>
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
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Crear" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/product/list"
              style={navLinkStyle}
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Listado" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/product/stock"
              style={navLinkStyle}
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Stock" />
            </ListItem>
          </List>
        </Collapse>

        {/* Pedido */}
        <ListItem
          component={NavLink}
          to="/admin/order/list"
          style={navLinkStyle}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Pedido" />
        </ListItem>

        <Typography
          sx={{
            paddingLeft: 2,
            marginTop: 2,
            marginBottom: 1,
            color: "#9e9e9e",
            fontSize: "0.8rem",
            fontStyle: "normal",
          }}
          variant="subtitle2"
        >
          Reportes
        </Typography>

        {/* Reportes */}
        <ListItem button="true" onClick={handleToggleReports}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <InsertChart />
          </ListItemIcon>
          <ListItemText primary="Reportes" />
          {openReports ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              component={NavLink}
              to="/admin/report/sales"
              style={navLinkStyle}
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <InsertChart />
              </ListItemIcon>
              <ListItemText primary="Ventas" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/report/stock"
              style={navLinkStyle}
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <InsertChart />
              </ListItemIcon>
              <ListItemText primary="Stock" />
            </ListItem>
            <ListItem
              component={NavLink}
              to="/admin/report/clients"
              style={navLinkStyle}
              sx={{ pl: 4, justifyContent: "center" }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <InsertChart />
              </ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
