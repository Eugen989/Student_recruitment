import {SliderTags} from "../../../shared/components/SliderTags/SliderTags.tsx";
import {sliderTagsData} from "../../../tempData/tempData.client.ts";
import {Link} from "react-router-dom";
import {ProjectCard} from "./ProjectCard.tsx";
import {ResumeCard} from "./ResumeCard.tsx";

export const ResumeFull = () => {

    // Создаем временные данные для пропсов ResumeCard
    const tempResumeData = [
        {
            id: 1,
            userName: "Иван Иванов",
            salary: 80000,
            description: "Frontend-разработчик с опытом работы 2 года",
            tags: ["React", "TypeScript"],
            projectCount: 5,
            imageUrl: "./tempCardPhoto.png"
        },
        {
            id: 2,
            userName: "Петр Петров",
            salary: 90000,
            description: "Fullstack разработчик",
            tags: ["Node.js", "Express"],
            projectCount: 3,
            imageUrl: null
        },
        {
            id: 3,
            userName: "Мария Сидорова",
            salary: 75000,
            description: "UX/UI дизайнер",
            tags: ["Figma", "Adobe XD"],
            projectCount: 7,
            imageUrl: "./user3.png"
        },
        {
            id: 4,
            userName: "Алексей Смирнов",
            salary: 100000,
            description: "DevOps инженер",
            tags: ["Docker", "Kubernetes"],
            projectCount: 4,
            imageUrl: null
        },
        {
            id: 5,
            userName: "Екатерина Кузнецова",
            salary: 85000,
            description: "Мобильный разработчик",
            tags: ["React Native", "Flutter"],
            projectCount: 6,
            imageUrl: "./user5.jpg"
        }
    ];



    return (
        <div className="flex justify-between">
            <div className="bg-white-10 py-7.5 px-30 border border-gray-20 rounded-2xl max-w-[1000px] w-full">
                <div className="flex gap-5">
                    <div className="max-w-55 w-full max-h-55 h-full">
                        <img src="./tempCardPhoto.png" alt="Картинка" className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-3xl font-semibold">Анатолий Полено</h3>
                            <SliderTags adaptability="xl" tags={sliderTagsData}/>
                            <div className="flex flex-col">
                            <span className="text-lg font-semibold">
                                <span>Желаемая должность:</span>
                                <span className="text-gray-10"> Frontend-разработчик</span>
                            </span>
                                <span className="text-lg font-semibold">
                                <span>Зарплатные ожидания: </span>
                                <span className="text-gray-10">от 80000 р./ мес.</span>
                            </span>
                                <span className="text-lg font-semibold">
                                <span>Опыт работы: </span>
                                <span className="text-gray-10">не имеется</span>
                            </span>
                                <span className="text-lg font-semibold">
                                <span>Репозиторий:</span>
                                <a href="https://github.com/PolenoAnatoliy" className="text-gray-10 underline">Ссылка</a>
                            </span>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <button className="px-10.5 py-1.5 font-semibold text-white-10 bg-blue-10 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:bg-purple-20 active:bg-blue-10 active:scale-95">
                                Нанять
                            </button>
                            <Link to={'/chat'} className="px-8 py-1.5 font-semibold bg-white-10 border border-gray-20 rounded-xl transition duration-300 ease-in-out hover:bg-purple-20 hover:text-white-10 hover:border-purple-20 active:text-black-20 active:bg-white-10 active:border-gray-20 active:scale-95">
                                Написать
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-7.5">
                    <h3 className="text-3xl font-semibold mt-7.5">О себе:</h3>
                    <p className="mt-1.25 text-justify">
                        Имею коммерческий опыт разработки приложений на React + Next.js, включая создание SSR- и SSG-приложений с оптимизированной производительностью. Работал над проектами различной сложности — от лендингов до многостраничных веб-приложений с динамическим контентом. Умею настраивать роутинг, API-интеграции (REST, GraphQL) и управление состоянием (Redux, Zustand, Context API).
                        Также имею опыт разработки Unit-тестов для мобильных приложений с использованием Jest и React Testing Library, что позволяет обеспечивать стабильность кода. Дополнительно работал с TypeScript для повышения надежности и масштабируемости проектов. Участвовал в Code Review, оптимизации сборки (Webpack, Vite) и улучшении SEO-параметров через Next.js. Владею навыками CI/CD-настройки (GitHub Actions, GitLab CI) для автоматизации развертывания. Имею опыт командной разработки по методологии Agile (Scrum, Kanban). Понимаю принципы UX/UI и адаптивной верстки для кросс-браузерной и мобильной совместимости. Готов к решению сложных задач и постоянному изучению новых технологий в области фронтенд-разработки.
                    </p>
                </div>
                <div>
                    <h3 className="text-3xl font-semibold mt-7.5">Проекты:</h3>
                    <div className="flex flex-col gap-5 mt-1.25">
                        <ProjectCard/>
                        <ProjectCard/>
                        <ProjectCard/>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-semibold">Похожие резюме</h3>
                <div className="flex flex-col gap-5 mt-2.5">
                    {tempResumeData.map((item) => (
                        <ResumeCard key={item.id} {...item} adaptability="lg"/>
                    ))}
                </div>
            </div>
        </div>
    )
}