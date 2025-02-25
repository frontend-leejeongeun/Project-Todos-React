import React from "react";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
}

export default function Footer({ text, ...props }: FooterProps) {
  return <footer {...props}>{text}</footer>;
}
