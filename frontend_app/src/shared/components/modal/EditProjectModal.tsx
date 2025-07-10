import type {EditProject} from "../../../features/profile/profileTypes.type.ts";
import {useForm} from "react-hook-form";
import {type ChangeEvent, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {ModalContainer} from "./ModalContainer.tsx";
import {InputAuth} from "../InputAuth/InputAuth.tsx";
import {TextareaForm} from "../TextareaForm/TextareaForm.tsx";

type EditProjectModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EditProject) => void;
    projectId: number | null;
};

export const EditProjectModal = ({
                                     isOpen,
                                     onClose,
                                     onSubmit,
                                     projectId
                                 }: EditProjectModalProps) => {
    const [projectData, setProjectData] = useState<EditProject | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm<EditProject>({
        defaultValues: {
            name: projectData?.name || '',
            description: projectData?.description || '',
            link: projectData?.link || '',
            image: projectData?.image || [],
        },
    });

    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageFiles = watch('image');
    const { ref, ...rest } = register('image');

    // Загрузка данных проекта при открытии модалки
    useEffect(() => {
        if (isOpen && projectId !== null) {
            // Здесь должен быть запрос к API для получения данных проекта
            // Для демонстрации используем заглушку
            const fetchProjectData = async () => {
                try {
                    // const response = await api.getProject(projectId);
                    // setProjectData(response.data);

                    // Заглушка данных
                    const tempProjectData = {
                        id: projectId,
                        name: `Проект ${projectId}`,
                        description: `Описание проекта ${projectId}`,
                        link: `https://project${projectId}.com`,
                        image: [] // Здесь должны быть файлы изображений
                    };
                    setProjectData(tempProjectData);

                    reset(tempProjectData);
                    // Установка превью изображений
                    // setPreviewImages(projectData.images.map(img => img.url));
                } catch (error) {
                    console.error("Ошибка загрузки проекта:", error);
                }
            };

            fetchProjectData();
        }
    }, [isOpen, projectId, reset]);

    useEffect(() => {
        if (!isOpen) {
            reset();
            setPreviewImages([]);
        }
    }, [isOpen, reset]);

    useEffect(() => {
        if (imageFiles && imageFiles.length > 0) {
            const newPreviews: string[] = [];
            const files = Array.isArray(imageFiles) ? imageFiles : [];

            files.forEach(file => {
                if (file && typeof file === 'object' && 'size' in file && 'type' in file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        newPreviews.push(reader.result as string);
                        if (newPreviews.length === files.length) {
                            setPreviewImages(newPreviews);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        } else {
            setPreviewImages([]);
        }
    }, [imageFiles]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const currentFiles = imageFiles as File[] || [];
            const updatedFiles = [...currentFiles, ...files].slice(0, 20);

            setValue('image', updatedFiles as any);
        }
    };

    const removeImage = (index: number) => {
        const updatedFiles = [...(imageFiles as File[] || [])];
        updatedFiles.splice(index, 1);
        setValue('image', updatedFiles as any);
    };

    const handleFormSubmit = (data: EditProject) => {
        onSubmit(data);
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black-30 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <ModalContainer onClick={(e) => e.stopPropagation()}
                            className="relative max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-semibold">
                        Добавление проекта
                    </h3>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-gray-40 hover:text-gray-10 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
                    <InputAuth
                        placeholder="Название проекта"
                        register={register}
                        registerOptions={{required: {value: true, message: 'Поле обязательно для заполнения'}}}
                        error={errors.name?.message}
                        name="name"
                    />

                    <TextareaForm
                        register={register}
                        error={errors.description?.message}
                        name="description"
                        placeholder="Описание проекта"
                        registerOptions={{required: {value: true, message: 'Поле обязательно для заполнения'}}}
                    />

                    <InputAuth
                        placeholder="Ссылка на проект"
                        register={register}
                        registerOptions={{
                            required: {value: true, message: 'Поле обязательно для заполнения'},
                            pattern: {
                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                message: 'Введите корректный URL'
                            }
                        }}
                        error={errors.link?.message}
                        name="link"
                    />

                    <div className="space-y-3">
            <span className="text-2xl font-medium">
              Изображения (до 20 шт.)
            </span>

                        <div className="flex gap-3 mt-2.5">
                            <label
                                htmlFor="image"
                                className="cursor-pointer flex-shrink-0"
                            >
                                <svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 14.2857C0 6.40625 6.39023 0 14.25 0H99.75C107.61 0 114 6.40625 114 14.2857V85.7143C114 93.5938 107.61 100 99.75 100H14.25C6.39023 100 0 93.5938 0 85.7143V14.2857ZM72.0961 38.058C71.0941 36.5848 69.4465 35.7143 67.6875 35.7143C65.9285 35.7143 64.2586 36.5848 63.2789 38.058L43.9078 66.5402L38.0074 59.1518C36.9832 57.8795 35.4469 57.1429 33.8438 57.1429C32.2406 57.1429 30.682 57.8795 29.6801 59.1518L15.4301 77.0089C14.1387 78.6161 13.8938 80.8259 14.7844 82.6786C15.675 84.5312 17.5453 85.7143 19.5938 85.7143H40.9688H48.0938H94.4062C96.3879 85.7143 98.2137 84.6205 99.1266 82.8571C100.039 81.0938 99.9281 78.9732 98.8148 77.3438L72.0961 38.058ZM24.9375 35.7143C27.772 35.7143 30.4904 34.5855 32.4947 32.5761C34.499 30.5668 35.625 27.8416 35.625 25C35.625 22.1584 34.499 19.4332 32.4947 17.4239C30.4904 15.4145 27.772 14.2857 24.9375 14.2857C22.103 14.2857 19.3846 15.4145 17.3803 17.4239C15.376 19.4332 14.25 22.1584 14.25 25C14.25 27.8416 15.376 30.5668 17.3803 32.5761C19.3846 34.5855 22.103 35.7143 24.9375 35.7143Z" fill="#344BC3"/>
                                    <circle cx="115" cy="49.875" r="33.5" fill="#344BC3" stroke="#A4B3FF" strokeWidth="3"/>
                                    <path d="M115 29.875V69.875" stroke="#A4B3FF" strokeWidth="4" strokeLinecap="round"/>
                                    <path d="M95 49.875H135" stroke="#A4B3FF" strokeWidth="4" strokeLinecap="round"/>
                                </svg>
                                <input
                                    id="image"
                                    className="hidden"
                                    accept="image/*"
                                    type="file"
                                    multiple
                                    {...rest}
                                    ref={(e) => {
                                        ref(e);
                                        fileInputRef.current = e;
                                    }}
                                    onChange={handleImageChange}
                                />
                            </label>

                            {previewImages.length > 0 && (
                                <div className="flex flex-wrap gap-1 ml-2">
                                    {previewImages.map((src, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={src}
                                                alt={`Preview ${index}`}
                                                className="w-8 h-8 object-cover rounded border border-gray-20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="font-semibold py-1.5 px-8.5 bg-white-10 border border-gray-20 rounded-[10px] cursor-pointer transition duration-300 ease-in-out hover:bg-purple-20 hover:text-white-10 hover:border-purple-20 active:scale-95 active:text-black-20 active:bg-white-10 active:border-gray-10"
                        >
                            Отменить
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-10.5 py-1.5 font-semibold text-white-10 bg-blue-10 rounded-[10px] hover:bg-purple-20 active:bg-blue-10 active:scale-95 transition-all"
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </ModalContainer>
        </div>,
        document.body
    );
};