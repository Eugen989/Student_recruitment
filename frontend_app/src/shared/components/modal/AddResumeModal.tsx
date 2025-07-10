import type {AddResume} from "../../../features/profile/profileTypes.type.ts";
import {useForm} from "react-hook-form";
import {createPortal} from "react-dom";
import {ModalContainer} from "./ModalContainer.tsx";
import {useEffect, useState} from "react";
import {InputAuth} from "../InputAuth/InputAuth.tsx";
import {TextareaForm} from "../TextareaForm/TextareaForm.tsx";

type Tag = {
    id: number;
    name: string;
};

type ProjectOption = {
    id: number;
    title: string;
};

type AddResumeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: AddResume) => void;
};

export const AddResumeModal = ({
                                   isOpen,
                                   onClose,
                                   onSubmit
                               }: AddResumeModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<AddResume>();

    const [tags, setTags] = useState<Tag[]>([]);
    const [projects, setProjects] = useState<ProjectOption[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

    // Загрузка тегов и проектов (в реальном приложении будет запрос к API)
    useEffect(() => {
        if (isOpen) {
            // Заглушка для тегов
            setTags([
                { id: 1, name: "Frontend" },
                { id: 2, name: "Backend" },
                { id: 3, name: "Fullstack" },
                { id: 4, name: "UI/UX дизайн" },
                { id: 5, name: "Мобильная разработка" },
            ]);

            // Заглушка для проектов
            setProjects([
                { id: 1, title: "Разработка программы для снимка экрана" },
                { id: 2, title: "Мобильное приложение для заметок" },
                { id: 3, title: "Система управления задачами" },
            ]);

            // Сброс выбранных значений
            setSelectedTags([]);
            setSelectedProjects([]);
            reset();
        }
    }, [isOpen, reset]);

    // Обновление значений формы при изменении выбранных тегов/проектов
    useEffect(() => {
        setValue("tegsId", selectedTags);
    }, [selectedTags, setValue]);

    useEffect(() => {
        setValue("projectsId", selectedProjects);
    }, [selectedProjects, setValue]);

    const handleTagChange = (id: number) => {
        setSelectedTags(prev =>
            prev.includes(id)
                ? prev.filter(tagId => tagId !== id)
                : [...prev, id]
        );
    };

    const handleProjectChange = (id: number) => {
        setSelectedProjects(prev =>
            prev.includes(id)
                ? prev.filter(projectId => projectId !== id)
                : [...prev, id]
        );
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black-30 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <ModalContainer
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                        Создание нового резюме
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
                        placeholder="Желаемая зарплата"
                        type="number"
                        register={register}
                        registerOptions={{
                            required: "Укажите желаемую зарплату",
                            min: { value: 0, message: "Зарплата не может быть отрицательной" },
                            valueAsNumber: true
                        }}
                        error={errors.salary?.message}
                        name="salary"
                    />

                    <TextareaForm
                        placeholder="Описание резюме"
                        register={register}
                        error={errors.description?.message}
                        name="description"
                        registerOptions={{
                            required: "Поле обязательно для заполнения",
                            minLength: { value: 50, message: "Минимум 50 символов" }
                        }}
                        className="min-h-[150px]"
                    />

                    <div className="space-y-3">
                        <label className="block text-gray-10 font-medium">
                            Выберите теги
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <button
                                    key={tag.id}
                                    type="button"
                                    onClick={() => handleTagChange(tag.id)}
                                    className={`px-3 py-1 rounded-full border ${
                                        selectedTags.includes(tag.id)
                                            ? "bg-purple-20 text-white border-purple-20"
                                            : "bg-white-10 border-gray-20 hover:bg-gray-10"
                                    } transition-colors`}
                                >
                                    {tag.name}
                                </button>
                            ))}
                        </div>
                        {errors.tegsId && (
                            <p className="mt-1 text-sm text-red-500">{errors.tegsId.message}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label className="block text-gray-10 font-medium">
                            Выберите проекты для включения в резюме
                        </label>
                        <div className="border border-gray-20 rounded-xl p-3 max-h-40 overflow-y-auto">
                            {projects.map(project => (
                                <div key={project.id} className="flex items-center py-2 border-b border-gray-10 last:border-b-0">
                                    <input
                                        type="checkbox"
                                        id={`project-${project.id}`}
                                        checked={selectedProjects.includes(project.id)}
                                        onChange={() => handleProjectChange(project.id)}
                                        className="h-5 w-5 text-purple-20 rounded focus:ring-purple-20"
                                    />
                                    <label htmlFor={`project-${project.id}`} className="ml-2 text-gray-10">
                                        {project.title}
                                    </label>
                                </div>
                            ))}
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
                            Создать резюме
                        </button>
                    </div>
                </form>
            </ModalContainer>
        </div>,
        document.body
    );
};