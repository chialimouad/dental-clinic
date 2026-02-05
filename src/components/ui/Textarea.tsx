import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const textareaId = id || React.useId();

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    id={textareaId}
                    className={cn(
                        "block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 transition-colors min-h-[120px] resize-y",
                        "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none",
                        "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
                        error &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        className
                    )}
                    ref={ref}
                    aria-invalid={!!error}
                    aria-describedby={
                        error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
                    }
                    {...props}
                />
                {error && (
                    <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-500">
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p
                        id={`${textareaId}-helper`}
                        className="mt-1.5 text-sm text-neutral-500"
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
