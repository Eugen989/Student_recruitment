import type {EditProfile} from "../../../features/profile/profileTypes.type.ts";
import {useForm} from "react-hook-form";
import {createPortal} from "react-dom";
import {ModalContainer} from "./ModalContainer.tsx";
import {useEffect} from "react";
import {InputAuth} from "../InputAuth/InputAuth.tsx";

type EditProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EditProfile) => void;
};

export const EditProfileModal = ({
                                     isOpen,
                                     onClose,
                                     onSubmit
                                 }: EditProfileModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<EditProfile>();

    // Сброс формы при закрытии
    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black-30 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <ModalContainer
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                        Редактирование профиля
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-40 hover:text-gray-10 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <InputAuth
                        placeholder="Имя"
                        register={register}
                        registerOptions={{ required: "Поле обязательно для заполнения" }}
                        error={errors.name?.message}
                        name="name"
                    />

                    <InputAuth
                        placeholder="Email"
                        type="email"
                        register={register}
                        registerOptions={{
                            required: "Поле обязательно для заполнения",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный email"
                            }
                        }}
                        error={errors.email?.message}
                        name="email"
                    />

                    <InputAuth
                        placeholder="Логин"
                        register={register}
                        registerOptions={{
                            required: "Поле обязательно для заполнения",
                            minLength: {
                                value: 3,
                                message: "Логин должен быть не менее 3 символов"
                            }
                        }}
                        error={errors.login?.message}
                        name="login"
                    />

                    <InputAuth
                        placeholder="Пароль"
                        type="password"
                        register={register}
                        name="password"
                        error={errors.password?.message}
                    />

                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="font-semibold py-1.5 px-8.5 bg-white-10 border border-gray-20 rounded-[10px] cursor-pointer transition duration-300 ease-in-out hover:bg-purple-20 hover:text-white-10 hover:border-purple-20 active:scale-95 active:text-black-20 active:bg-white-10 active:border-gray-10"
                        >
                            Отменить изменения
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-10.5 py-1.5 font-semibold text-white-10 bg-blue-10 rounded-[10px] hover:bg-purple-20 active:bg-blue-10 active:scale-95 transition-all"
                        >
                            Сохранить изменения
                        </button>
                    </div>
                </form>
            </ModalContainer>
        </div>,
        document.body
    );
};