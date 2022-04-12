import { CSSProperties } from "react";

export const themes = {
  dark: {
    color: "white",
    highlight: "#91F291",
    secondary: "#F2F230",
    warn: "#C2F261",
    blue1: "#61F2C2",
    blue1Light: "#C6FAE9",
    blue2: "#30F2F2",
    header: {
      title: {
        color: "white",
        fontWeight: "bold",
        fontSize: "2.5rem",
        textAlign: "center",
        background: "#333366FE",
      } as CSSProperties,
      layout: {
      },
    },
  },
  light: {
    color: "inherit",
    highlight: "#91F291",
    secondary: "#F2F230",
    warn: "#C2F261",
    blue1: "#61F2C2",
    blue1Light: "#C6FAE9",
    blue2: "#30F2F2",
    header: {
      title: {
        color: "white",
        fontWeight: "bold",
        fontSize: "2.5rem",
        textAlign: "center",
        background: "#333366FE",
      } as CSSProperties,
      layout: {
      },
    },
  }
}