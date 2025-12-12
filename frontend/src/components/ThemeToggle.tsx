import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

type Props = {
  mode: "light" | "dark";
  onToggle: () => void;
};

const ThemeToggle: React.FC<Props> = ({ mode, onToggle }) => (
  <Tooltip title="Toggle theme">
    <IconButton color="inherit" onClick={onToggle} aria-label="toggle theme">
      {mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  </Tooltip>
);

export default ThemeToggle;

