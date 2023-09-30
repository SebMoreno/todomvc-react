import React from "react";
import "../styles/Button.css";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type: "galaxy" | "lifted";
    buttonNativeProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({children, type, onClick, buttonNativeProps}) => (
    <button className={type} onClick={onClick} {...buttonNativeProps}>
        <span>{children}</span>
    </button>
);
