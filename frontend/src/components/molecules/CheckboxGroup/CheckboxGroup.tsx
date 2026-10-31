import type { ChangeEvent } from "react";
import Checkbox from "../../atoms/Checkbox/Checkbox";
import "./CheckboxGroup.scss";

export interface CheckboxGroupOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface CheckboxGroupProps {
    label: string;
    name: string;
    options: CheckboxGroupOption[];
    value: string[];
    onChange: (value: string[]) => void;
    hint?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

function CheckboxGroup({
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
}: CheckboxGroupProps) {
    const hintId = `${name}-hint`;
    const errorId = `${name}-error`;

    const describedBy = [
        hint ? hintId : null,
        error ? errorId : null,
    ]
        .filter(Boolean)
        .join(" ") || undefined;

    const classes = ["checkbox-group", className]
        .filter(Boolean)
        .join(" ");

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        optionValue: string
    ) => {
        const isChecked = event.currentTarget.checked;

        if (isChecked) {
            onChange([...value, optionValue]);
        } else {
            onChange(value.filter((item) => item !== optionValue));
        }
    };

    return (
        <fieldset
            className={classes}
            disabled={disabled}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            aria-required={required || undefined}
>
            <legend className="checkbox-group__label">
                {label}
                {required && <span aria-hidden="true"> *</span>}
            </legend>

            <div className="checkbox-group__options">
                {options.map((option) => (
                    <Checkbox
                        key={option.value}
                        name={name}
                        value={option.value}
                        label={option.label}
                        checked={value.includes(option.value)}
                        onChange={(event) => handleChange(event, option.value)}
                        disabled={disabled || option.disabled}
                    />
                ))}
            </div>

            {hint && (
                <p id={hintId} className="checkbox-group__hint">
                    {hint}
                </p>
            )}

            {error && (
                <p id={errorId} className="checkbox-group__error">
                    {error}
                </p>
            )}
        </fieldset>
    );
}

export default CheckboxGroup;