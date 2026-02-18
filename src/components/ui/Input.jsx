import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = ({ label, error, className, id, ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={twMerge(
                    "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none",
                    error ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 dark:border-gray-600",
                    "bg-gray-50 dark:bg-gray-700 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-600",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-red-500 animate-in slide-in-from-top-1 fade-in">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
