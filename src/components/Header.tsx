import React from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
}

export default function Header({ text, ...props }: HeaderProps) {
  return <header {...props}>{text}</header>;
}
