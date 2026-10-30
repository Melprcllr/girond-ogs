import type { HTMLAttributes, ReactNode } from "react";
import "./Badge.scss";

type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "info";
type BadgeSize = "small" | "medium" | "large";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    icon?: ReactNode;
    children: ReactNode;
}

function Badge({
    variant = "neutral",
    size = "medium",
    icon,
    children,
    className = "",
    ...props
}: BadgeProps) {
    const classes = [
        "badge",
        `badge--${variant}`,
        `badge--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span className={classes} {...props}>
            {icon && (
                <span className="badge__icon" aria-hidden="true">
                    {icon}
                </span>
            )}

            <span className="badge__label">{children}</span>
        </span>
    );
}

export default Badge;