import {ButtonProfile} from "./ButtonProfile.tsx";
import {ResumeCardSlider} from "../../../shared/components/ResumeCardSlider/ResumeCardSlider.tsx";
import {ProjectsSlider} from "../../../shared/components/ProjectsSlider/ProjectsSlider.tsx";
import {useEffect, useState} from "react";
import type {AddProject, AddResume, EditProfile, EditProject, EditResume} from "../profileTypes.type.ts";
import {AddProjectModal} from "../../../shared/components/modal/AddProjectModal.tsx";
import {EditProjectModal} from "../../../shared/components/modal/EditProjectModal.tsx";
import {AddResumeModal} from "../../../shared/components/modal/AddResumeModal.tsx";
import {EditResumeModal} from "../../../shared/components/modal/EditResumeModal.tsx";
import {EditProfileModal} from "../../../shared/components/modal/EditProfileModal.tsx";
import {useNavigate} from "react-router-dom";
import {clearToken, isTokenValid} from "../../../utils/token.client.ts";
import {useUser} from "../../../shared/hooks/useUser.tsx";

type ModalsState = {
    addProject: boolean;
    editProject: boolean;
    addResume: boolean;
    editResume: boolean;
    editProfile: boolean;
};

export const Profile = () => {
    const navigate = useNavigate();
    const [modalsOpen, setModalsOpen] = useState<ModalsState>({
        addProject: false,
        editProject: false,
        addResume: false,
        editResume: false,
        editProfile: false
    });

    const user = useUser();
    const role = user?.role;
    const isToken = isTokenValid();

    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);

    // Обработчик клика на редактирование резюме
    const handleResumeEditClick = (id: number) => {
        setSelectedResumeId(id);
        setModalsOpen(prev => ({
            ...prev,
            editResume: true
        }));
    };

    // Обработчик отправки формы редактирования резюме
    const handleEditResumeSubmit = (data: EditResume) => {
        console.log("Редактирование резюме:", data);
        closeAllModals();
    };

    const handleProjectEditClick = (id: number) => {
        setSelectedProjectId(id);
        setModalsOpen(prev => ({
            ...prev,
            editProject: true
        }));
    };

    const closeAllModals = () => {
        setModalsOpen({
            addProject: false,
            editProject: false,
            addResume: false,
            editResume: false,
            editProfile: false
        });
    };

    const openModal = (modalName: keyof ModalsState) => {
        setModalsOpen(prev => ({
            ...prev,
            [modalName]: true
        }));
    };

    useEffect(() => {
        const isAnyModalOpen = Object.values(modalsOpen).some(isOpen => isOpen);

        if (isAnyModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [modalsOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeAllModals();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleAddProjectSubmit = (data: AddProject) => {
        console.log("Добавление проекта:", data);
        closeAllModals();
    };

    const handleEditProjectSubmit = (data: EditProject) => {
        console.log("Редактирование проекта:", data);
        closeAllModals();
    };

    const handleAddResumeSubmit = (data: AddResume) => {
        console.log("Создание резюме:", data);
        closeAllModals();
    };

    const handleEditProfileSubmit = (data: EditProfile) => {
        console.log("Изменение профиля:", data);
        closeAllModals();
    };

    const logout = () => {
        clearToken();
        navigate('/login');
        window.location.reload();
    };

    return (
        <div className="bg-white-10 border border-gray-20 rounded-2xl max-w-7xl w-full mx-auto py-7.5 px-30">
            <div className="flex gap-5">
                <div className="max-w-55 w-full max-h-55 h-full">
                    <img src="./tempCardPhoto.png" alt="картинка" className="w-full h-full object-cover"/>
                </div>
                <div className="flex flex-col max-w-2xl w-full">
                    <div className="flex items-center justify-between">
                        <h3 className="text-3xl/2 font-semibold">SantaFe09</h3>
                        <div className="flex gap-5">
                            <button onClick={() => openModal("editProfile")} className="font-semibold py-1.5 px-8.5 bg-white-10 border border-gray-20 rounded-[10px] cursor-pointer transition duration-300 ease-in-out hover:bg-purple-20 hover:text-white-10 hover:border-purple-20 active:scale-95 active:text-black-20 active:bg-white-10 active:border-gray-10">
                                Изменить профиль
                            </button>
                            <ButtonProfile onClick={logout}>
                                Выйти из аккаунта
                            </ButtonProfile>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-y-1.25 gap-x-5">
                        <span className="text-xl font-semibold">
                            ФИО:
                            <span className="text-gray-10"> Анатолий</span>
                        </span>
                        <span className="text-xl font-semibold">
                            Контакты:
                            <span className="text-gray-10"> fanta1998@gmail.com</span>
                        </span>
                        <span className="text-xl font-semibold">
                            Статус:
                            <span className="text-gray-10"> Студент</span>
                        </span>
                    </div>
                    {isToken && role !== 'employer' && (
                        <div className="flex gap-5 mt-5">
                            <ButtonProfile onClick={() => openModal('addResume')}>
                                Создать резюме
                            </ButtonProfile>
                            <ButtonProfile onClick={() => openModal('addProject')}>
                                Добавить проект
                            </ButtonProfile>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-7.5">
                <h3 className="text-3xl font-semibold">
                    Список резюме
                </h3>
                <ResumeCardSlider onEditClick={handleResumeEditClick} />
                <div className="mt-2.5">
                    <h3 className="text-3xl font-semibold">Список проектов</h3>
                    <ProjectsSlider onEditClick={handleProjectEditClick}/>
                </div>
            </div>
            <AddProjectModal
                isOpen={modalsOpen.addProject}
                onClose={closeAllModals}
                onSubmit={handleAddProjectSubmit}
            />

            <EditProjectModal
                isOpen={modalsOpen.editProject}
                onClose={closeAllModals}
                onSubmit={handleEditProjectSubmit}
                projectId={selectedProjectId}
            />

            <AddResumeModal
                isOpen={modalsOpen.addResume}
                onClose={closeAllModals}
                onSubmit={handleAddResumeSubmit}
            />

            <EditResumeModal
                isOpen={modalsOpen.editResume}
                onClose={closeAllModals}
                onSubmit={handleEditResumeSubmit}
                resumeId={selectedResumeId}
            />

            <EditProfileModal
                isOpen={modalsOpen.editProfile}
                onClose={closeAllModals}
                onSubmit={handleEditProfileSubmit}
            />
        </div>
    );
};