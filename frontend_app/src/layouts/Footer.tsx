import {Nav} from "./Nav.tsx";
import logo from "../assets/logotypeFooter.png";

export const Footer = () => {
    return (
        <footer className="bg-white-10 py-5">
            <div className="container mx-auto px-4 flex justify-between relative">
                <div className="flex flex-col gap-2.5">
                    <span className="font-bold text-xl">Меню</span>
                    <Nav links={[]} orientation="vertical"/>
                </div>
                <div className="max-w-36 w-full absolute top-0 left-1/2 -translate-x-1/2">
                    <img src={logo} alt="логотип" className="block object-cover"/>
                </div>
                <div className="flex flex-col gap-2.5">
                    <span className="font-bold text-xl">Разработка</span>
                    <ul className="flex flex-col gap-2.5 text-xl font-medium">
                        <li>Терешин Роман  - Аналитик</li>
                        <li>Костин Максим - Дизайнер</li>
                        <li>Константин Палий - Фронтенд</li>
                        <li>Круглик Евгений - Бэкенд</li>
                        <li>Лелетко Павел - Тестировщик</li>
                    </ul>
                </div>
            </div>
            <div className="relative grid items-center max-h-12.5 h-full">
                <hr className="border-blue-10 my-5"/>
                <div className="flex justify-center gap-11 bg-white-10 px-11 absolute top-0 left-1/2 -translate-x-1/2">
                    <a href="https://t.me/bgituofficial">
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="
                            fill-blue-10
                            hover:fill-purple-20
                            transition duration-300 ease-in-out"
                        >
                            <path
                                d="M25 0C11.1895 0 0 11.1895 0 25C0 38.8105 11.1895 50 25
                                50C38.8105 50 50 38.8105 50 25C50 11.1895 38.8105 0 25
                                0ZM36.5927 17.006C36.2198 20.9577 34.5867 30.5544 33.7601
                                34.9798C33.4073 36.8548 32.7218 37.4798 32.0565 37.5403C30.6048
                                37.6714 29.5061 36.5827 28.0948 35.6552C25.8972 34.2137 24.6472
                                33.3165 22.5202 31.9052C20.0504 30.2823 21.6532 29.3851 23.0544
                                27.9234C23.4274 27.5403 29.8185 21.7238 29.9395 21.1996C29.9597
                                21.129 29.9698 20.8871 29.8185 20.756C29.6673 20.625 29.4556
                                20.6754 29.3044 20.7056C29.0827 20.7527 25.5679 23.0746 18.7601
                                27.6714C17.7655 28.3569 16.8616 28.6895 16.0484 28.6694C15.1512
                                28.6492 13.4375 28.1653 12.1573 27.752C10.5948 27.248 9.34476
                                26.9758 9.45565 26.1089C9.50941 25.6586 10.131 25.1983 11.3206
                                24.7278C18.6055 21.5558 23.4644 19.4624 25.8972 18.4476C32.8427
                                15.5645 34.2843 15.0605 35.2218 15.0403C35.4335 15.0403 35.8871
                                15.0907 36.1895 15.3327C36.3869 15.5062 36.5127 15.7469 36.5423
                                16.0081C36.5969 16.3377 36.6138 16.6726 36.5927 17.006Z"
                            />
                        </svg>
                    </a>
                    <div className="flex gap-5">
                        <a
                            href="https://it.bgitu.ru/"
                            className="
                            bg-blue-10
                            hover:bg-purple-20
                            text-white-10 text-xl font-bold
                            py-3 px-3.5
                            rounded-2xl
                            transition duration-300 ease-in-out"
                        >
                            it.bgitu
                        </a>
                        <a
                            href="https://bgitu.ru/"
                            className="
                            bg-blue-10
                            hover:bg-purple-20
                            text-white-10 text-xl font-bold
                            py-3 px-3.5
                            rounded-2xl
                            transition duration-300 ease-in-out"
                        >
                            БГИТУ
                        </a>
                    </div>
                    <a href="https://vk.com/bgitu_ru?from=groups">
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="
                            fill-blue-10
                            hover:fill-purple-20
                            transition duration-300 ease-in-out"
                        >
                            <path
                                d="M3.51562 3.51562C0 7.03125 0 12.6897 0 23.9955V26.0045C0
                                37.3103 0 42.9688 3.51562 46.4844C7.03125 50 12.6897 50 23.9955
                                50H26.0045C37.3103 50 42.9688 50 46.4844 46.4844C50 42.9688 50
                                37.3103 50 26.0045V23.9955C50 12.6897 50 7.03125 46.4844
                                3.51562C42.9688 0 37.3103 0 26.0045 0H23.9955C12.6897 0 7.03125
                                0 3.51562 3.51562ZM8.4375 15.2121H14.1406C14.3304 24.7545 18.5379
                                28.7946 21.875 29.6205V15.2121H27.2545V23.4375C30.5469 23.0804
                                33.9955 19.3304 35.1674 15.2121H40.5469C40.1004 17.3438 39.2299
                                19.375 37.9688 21.1607C36.7076 22.9464 35.1004 24.4531 33.2254
                                25.5804C35.3125 26.6183 37.154 28.0804 38.6272 29.8884C40.1116
                                31.6853 41.183 33.7723 41.7969 36.0156H35.8705C35.3348 34.0737
                                34.2188 32.3214 32.6897 31.0045C31.1496 29.6763 29.2634 28.8393
                                27.2545 28.5826V36.0156H26.6071C15.2121 36.0156 8.70536 28.2031
                                8.4375 15.2121Z"
                            />
                        </svg>

                    </a>
                </div>
            </div>
            <div>
                <p className="text-center text-xl font-medium mt-5">
                    &copy; {new Date().getFullYear()} Все права защищены.
                </p>
            </div>
        </footer>
    );
};