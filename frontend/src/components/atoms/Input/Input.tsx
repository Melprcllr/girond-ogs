import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import "./Input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hint?: string;
    error?: string;
}

function Input({
    label,
    hint,
    error,
    id,
    className = "",
    type = "text",
    ...props
}: InputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    const describedBy = [
        props["aria-describedby"],
        hint ? hintId : "",
        error ? errorId : "",
    ]
        .filter(Boolean)
        .join(" ");

    const classes = [
        "input",
        error ? "input--error" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="input-field">
            <label className="input-field__label" htmlFor={inputId}>
                {label}
                {props.required && (
                    <span className="input-field__required" aria-hidden="true">
                        {" "}*
                    </span>
                )}
            </label>

            <input
                {...props}
                id={inputId}
                type={type}
                className={classes}
                aria-invalid={error ? true : props["aria-invalid"]}
                aria-describedby={describedBy || undefined}
            />

            {hint && (
                <span id={hintId} className="input-field__hint">
                    {hint}
                </span>
            )}

            {error && (
                <span id={errorId} className="input-field__error">
                    {error}
                </span>
            )}
        </div>
    );
}

export default Input;