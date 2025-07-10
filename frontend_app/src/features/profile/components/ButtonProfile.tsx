import type {ReactNode} from "react";

interface ButtonProfileProps {
    children: ReactNode | string;
    className?: string;
    onClick?: () => void;
}

export const ButtonProfile = ({children, className, onClick}: ButtonProfileProps) => {
    return (
        <button
            className={`flex items-center cursor-pointer px-10.5 py-1.5 font-semibold text-white-10 bg-blue-10 rounded-[10px] hover:bg-purple-20 active:bg-blue-10 active:scale-95 transition-all ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}