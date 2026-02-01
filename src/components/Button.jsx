import React from 'react';

/**
 * Enhanced Apple-style Button Component
 * - Adjusted to font-medium for a cleaner, lighter look
 * - Maintains 3D depth and inverse fill interaction
 */
const Button = ({
    children,
    variant = 'primary',
    size = 'default',
    className = '',
    ...props
}) => {
    const baseStyles = "group relative font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.97] overflow-hidden rounded-full border z-10 select-none cursor-pointer font-sans";

    const variants = {
        primary: "bg-[#0071e3] text-white border-blue-400/20 shadow-[0_4px_14px_0_rgba(0,113,227,0.3)] hover:shadow-[0_6px_20px_rgba(0,113,227,0.4)] hover:text-[#0071e3]",
        secondary: "bg-white text-black border-slate-200 shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] hover:text-white hover:border-black",
        outline: "bg-white/10 backdrop-blur-md text-white border-white/20 hover:text-black hover:border-white",
    };

    const fillColors = {
        primary: "bg-white",
        secondary: "bg-black",
        outline: "bg-white",
    };

    const sizes = {
        default: "h-12 md:h-14 px-8 md:px-12 text-[15px] md:text-[16px] w-full",
        sm: "h-9 md:h-10 px-5 md:px-6 text-xs md:text-sm",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.default} ${className}`}
            {...props}
        >
            <span className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/15 to-transparent z-20 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity" />
            <span className={`absolute inset-0 w-full h-full ${fillColors[variant]} -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10`} />
            <span className="relative flex items-center gap-2 pointer-events-none z-30">
                {children}
            </span>
        </button>
    );
};

export default Button;
