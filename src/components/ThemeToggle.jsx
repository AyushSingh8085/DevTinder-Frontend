import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="shadow-2xl border border-gray-800 rounded-md px-3"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggleButton;
