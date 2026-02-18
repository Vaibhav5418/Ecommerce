import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={twMerge(
                "bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6",
                "hover:shadow-md transition-shadow duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
