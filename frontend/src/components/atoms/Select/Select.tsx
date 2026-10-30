import { useId } from "react";
import type { SelectHTMLAttributes } from "react";
import "./Select.scss";

export interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[];
    placeholder?: string;
    hint?: string;
    error?: string;
}

function Select({
    label,
    options,
    placeholder = "Sélectionner une option",
    hint,
    error,
    id,
    className = "",
    ...props
}: SelectProps) {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;

    const describedBy = [
        props["aria-describedby"],
        hint ? hintId : "",
        error ? errorId : "",
    ]
        .filter(Boolean)
        .join(" ");

    const classes = [
        "select",
        error ? "select--error" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="select-field">
            <label className="select-field__label" htmlFor={selectId}>
                {label}
                {props.required && (
                    <span className="select-field__required" aria-hidden="true">
                        {" "}*
                    </span>
                )}
            </label>

            <div className="select-field__wrapper">
                <select
                    {...props}
                    id={selectId}
                    className={classes}
                    aria-invalid={error ? true : props["aria-invalid"]}
                    aria-describedby={describedBy || undefined}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <span className="select-field__icon" aria-hidden="true">
                    ▼
                </span>
            </div>

            {hint && (
                <span id={hintId} className="select-field__hint">
                    {hint}
                </span>
            )}

            {error && (
                <span id={errorId} className="select-field__error">
                    {error}
                </span>
            )}
        </div>
    );
}

export default Select;