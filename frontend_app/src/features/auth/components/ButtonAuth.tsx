import type { ButtonAuthProps } from "../type/typeAuth.types";

export const ButtonAuth = (
    {
        children,
        className = '',
        disabled = false,
    }: ButtonAuthProps
) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={
                `
                    flex items-center justify-center
                    max-w-[250px] w-full 
                    py-2 
                    text-xl font-bold text-white-10 bg-blue-10 rounded-2xl
                    cursor-pointer
                    transition duration-300 ease-in-out
                    hover:bg-purple-20
                    active:bg-blue-10 active:scale-95
                    ${className}
                `
            }
        >
            {children}
        </button>
    );
}