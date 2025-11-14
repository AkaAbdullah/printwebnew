// src/utils/SvgWrapper.tsx
import React from "react";

interface SvgWrapperProps {
  children: React.ReactNode;
  viewBox?: string;
  size?: number;
}

export const SvgWrapper = ({
  children,
  viewBox = "0 0 100 100",
  size = 100,
}: SvgWrapperProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    width={size}
    height={size}
    style={{ overflow: "visible" }}
  >
    {children}
  </svg>
);
