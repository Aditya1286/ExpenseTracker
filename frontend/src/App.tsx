import React, { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import ThemeToggle from "./components/ThemeToggle";
import { ExpenseProvider } from "./context/ExpenseContext";

const Navigation: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
  const location = useLocation();
  const items = [
    { label: "Dashboard", path: "/" },
    { label: "Expenses", path: "/expenses" },
    { label: "Categories", path: "/categories" },
    { label: "Backup & Export", path: "/settings" },
  ];
  return (
    <List>
      {items.map((item) => (
        <ListItemButton
          key={item.path}
          component={Link}
          to={item.path}
          selected={location.pathname === item.path}
          onClick={onNavigate}
        >
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );
};

const Shell: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:960px)");
  const drawerWidth = 220;
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(prefersDark ? "dark" : "light");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        shape: { borderRadius: 10 },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Expense Tracker
            </Typography>
            <ThemeToggle mode={mode} onToggle={() => setMode(mode === "dark" ? "light" : "dark")} />
          </Toolbar>
        </AppBar>

        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onMouseLeave={() => !isMobile && setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              transition: "transform 0.2s ease",
              transform: !isMobile && !drawerOpen ? `translateX(-${drawerWidth}px)` : "translateX(0)",
            },
          }}
        >
          <Toolbar />
          <Navigation onNavigate={() => setDrawerOpen(false)} />
        </Drawer>

        {!isMobile && (
          <Box
            onMouseEnter={() => setDrawerOpen(true)}
            sx={{
              position: "fixed",
              top: 64,
              left: 0,
              width: 12,
              height: "calc(100vh - 64px)",
              zIndex: (theme) => theme.zIndex.drawer - 1,
            }}
          />
        )}

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <ExpenseProvider>
      <Shell />
    </ExpenseProvider>
  </BrowserRouter>
);

export default App;

