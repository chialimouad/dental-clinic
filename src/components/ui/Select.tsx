import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        { className, label, error, helperText, options, placeholder, id, ...props },
        ref
    ) => {
        const selectId = id || React.useId();

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        id={selectId}
                        className={cn(
                            "block w-full appearance-none rounded-lg border border-neutral-300 bg-white px-4 py-3 pr-10 text-neutral-900 transition-colors",
                            "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none",
                            "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
                            error &&
                            "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                            className
                        )}
                        ref={ref}
                        aria-invalid={!!error}
                        aria-describedby={
                            error
                                ? `${selectId}-error`
                                : helperText
                                    ? `${selectId}-helper`
                                    : undefined
                        }
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
                        <ChevronDown className="h-5 w-5" />
                    </div>
                </div>
                {error && (
                    <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-500">
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p
                        id={`${selectId}-helper`}
                        className="mt-1.5 text-sm text-neutral-500"
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);
Select.displayName = "Select";

export { Select };
