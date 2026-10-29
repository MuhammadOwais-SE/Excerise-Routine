import React from "react";
import { cardShadow, colors } from "../theme";

export function Card({ as: Tag = "section", dashed = false, className = "", style, children, ...rest }) {
  return (
    <Tag
      className={`rounded-3xl bg-surface p-5 ${className}`}
      style={{
        boxShadow: dashed ? "none" : cardShadow,
        border: dashed ? `1.5px dashed ${colors.sun}` : "1px solid rgba(225,232,222,0.7)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
