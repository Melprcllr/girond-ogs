import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import "./Checkbox.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hint?: string;
    error?: string;
}

function Checkbox({
    label,
    hint,
    error,
    id,
    className = "",
    ...props
}: CheckboxProps) {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;

    const hintId = `${checkboxId}-hint`;
    const errorId = `${checkboxId}-error`;

    const describedBy = [
        props["aria-describedby"],
        hint ? hintId : "",
        error ? errorId : "",
    ]
        .filter(Boolean)
        .join(" ");

    const classes = [
        "checkbox",
        error ? "checkbox--error" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="checkbox-field">
            <label className="checkbox-field__label" htmlFor={checkboxId}>
                <input
                    {...props}
                    id={checkboxId}
                    type="checkbox"
                    className={classes}
                    aria-invalid={error ? true : props["aria-invalid"]}
                    aria-describedby={describedBy || undefined}
                />

                <span className="checkbox-field__text">{label}</span>
            </label>

            {hint && (
                <span id={hintId} className="checkbox-field__hint">
                    {hint}
                </span>
            )}

            {error && (
                <span id={errorId} className="checkbox-field__error">
                    {error}
                </span>
            )}
        </div>
    );
}

export default Checkbox;