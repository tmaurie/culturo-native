export const buttonThemes = {
  primary: { bg: "#3a86ff", text: "#fff" },
  success: { bg: "#06d6a0", text: "#000" },
  warning: { bg: "#ffbe0b", text: "#000" },
  danger: { bg: "#ef476f", text: "#fff" },
};

export function getBadgeColor(type: string) {
  switch (type.toLowerCase()) {
    case "easy":
      return "#06d6a0";
    case "medium":
      return "#ffbe0b";
    case "hard":
      return "#ef476f";
    default:
      return "#8338ec"; // Fallback color
  }
}
