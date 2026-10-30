
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.scss";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children: ReactNode;
}

function Button({
    variant = "primary",
    size = "medium",
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    const classes = [
        "button",
        `button--${variant}`,
        `button--${size}`,
        fullWidth ? "button--full-width" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={classes}
            {...props}
        >
            {leftIcon && (
                <span className="button__icon" aria-hidden="true">
                    {leftIcon}
                </span>
            )}

            <span className="button__label">{children}</span>

            {rightIcon && (
                <span className="button__icon" aria-hidden="true">
                    {rightIcon}
                </span>
            )}
        </button>
    );
}

export default Button;
