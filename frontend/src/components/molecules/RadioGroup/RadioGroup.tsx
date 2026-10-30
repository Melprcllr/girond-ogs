import type { ChangeEvent } from "react";
import Radio from "../../atoms/Radio/Radio";
import "./RadioGroup.scss";

export interface RadioGroupOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface RadioGroupProps {
    label: string;
    name: string;
    options: RadioGroupOption[];
    value: string;
    onChange: (value: string) => void;
    hint?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

function RadioGroup({
    label,
    name,
    options,
    value,
    onChange,
    hint,
    error,
    disabled = false,
    required = false,
    className = "",
}: RadioGroupProps) {
    const hintId = `${name}-hint`;
    const errorId = `${name}-error`;

    const describedBy = [
        hint ? hintId : null,
        error ? errorId : null,
    ]
        .filter(Boolean)
        .join(" ") || undefined;

    const classes = ["radio-group", className]
        .filter(Boolean)
        .join(" ");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value);
    };

    return (
        <fieldset
            className={classes}
            disabled={disabled}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
        >
            <legend className="radio-group__label">
                {label}
                {required && <span aria-hidden="true"> *</span>}
            </legend>

            <div className="radio-group__options">
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        name={name}
                        value={option.value}
                        label={option.label}
                        checked={value === option.value}
                        onChange={handleChange}
                        disabled={disabled || option.disabled}
                        required={required}
                    />
                ))}
            </div>

            {hint && (
                <p id={hintId} className="radio-group__hint">
                    {hint}
                </p>
            )}

            {error && (
                <p id={errorId} className="radio-group__error">
                    {error}
                </p>
            )}
        </fieldset>
    );
}

export default RadioGroup;