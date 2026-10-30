import { useId, type InputHTMLAttributes } from "react";
import "./Radio.scss";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hint?: string;
    error?: string;
}

function Radio({
    label,
    hint,
    error,
    id,
    className = "",
    ...props
}: RadioProps) {
    const generatedId = useId();
    const radioId = id ?? generatedId;

    const hintId = `${radioId}-hint`;
    const errorId = `${radioId}-error`;

    const describedBy = [
        hint ? hintId : null,
        error ? errorId : null,
    ]
        .filter(Boolean)
        .join(" ") || undefined;

    const classes = ["radio", className].filter(Boolean).join(" ");

    return (
        <div className="radio-field">
            <label className={classes} htmlFor={radioId}>
                <input
                    {...props}
                    id={radioId}
                    type="radio"
                    className="radio__input"
                    aria-describedby={describedBy}
                    aria-invalid={error ? true : undefined}
                />

                <span className="radio__control" aria-hidden="true" />

                <span className="radio__label">{label}</span>
            </label>

            {hint && (
                <span id={hintId} className="radio-field__hint">
                    {hint}
                </span>
            )}

            {error && (
                <span id={errorId} className="radio-field__error">
                    {error}
                </span>
            )}
        </div>
    );
}

export default Radio;