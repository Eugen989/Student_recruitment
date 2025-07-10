import type {HTMLAttributes, ReactNode} from "react";

type ModalContainerProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

export const ModalContainer = ({
                                   children,
                                   onClick,
                                   className = "",
                                   ...props
                               }: ModalContainerProps) => {
    return (
        <div
            className={`bg-white-10 border border-gray-20 rounded-2xl p-5 max-w-[580px] w-full ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};