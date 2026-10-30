import { useId, type TextareaHTMLAttributes } from "react";
import "./Textarea.scss";

interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    hint?: string;
    error?: string;
}

function Textarea({
    label,
    hint,
    error,
    id,
    className = "",
    ...props
}: TextareaProps) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    const hintId = `${textareaId}-hint`;
    const errorId = `${textareaId}-error`;

    const describedBy = [
        hint ? hintId : null,
        error ? errorId : null,
    ]
        .filter(Boolean)
        .join(" ") || undefined;

    const classes = ["textarea__field", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="textarea">
            <label className="textarea__label" htmlFor={textareaId}>
                {label}
                {props.required && <span aria-hidden="true"> *</span>}
            </label>

            <textarea
                {...props}
                id={textareaId}
                className={classes}
                aria-describedby={describedBy}
                aria-invalid={error ? true : undefined}
            />

            {hint && (
                <span id={hintId} className="textarea__hint">
                    {hint}
                </span>
            )}

            {error && (
                <span id={errorId} className="textarea__error">
                    {error}
                </span>
            )}
        </div>
    );
}

export default Textarea;