import {Link} from "react-router-dom";

export const AuthOnlyNav = () => {
    return (
        <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
                {/* Иконка уведомлений */}
                <svg
                    width="41"
                    height="46"
                    viewBox="0 0 41 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer fill-blue-10 group-hover:fill-purple-20 transition duration-300 ease-in-out"
                >
                    <path
                        d="M20.125 0C18.5348 0 17.25 1.28477 17.25 2.875V4.6C10.6914 5.92969
                        5.74999 11.7336 5.74999 18.6875V20.3766C5.74999 24.5992 4.19569 28.6781
                        1.39257 31.8406L0.727724 32.5863C-0.0269639 33.4309 -0.206651 34.6437
                        0.251552 35.677C0.709755 36.7102 1.74296 37.375 2.87499 37.375H37.375C38.507
                        37.375 39.5312 36.7102 39.9984 35.677C40.4656 34.6437 40.2769 33.4309 39.5223
                        32.5863L38.8574 31.8406C36.0543 28.6781 34.5 24.6082 34.5
                        20.3766V18.6875C34.5 11.7336 29.5586 5.92969 23 4.6V2.875C23 1.28477
                        21.7152 0 20.125 0ZM24.1949 44.3199C25.273 43.2418 25.875 41.7773 25.875
                        40.25H20.125H14.375C14.375 41.7773 14.9769 43.2418 16.0551 44.3199C17.1332
                        45.398 18.5976 46 20.125 46C21.6523 46 23.1168 45.398 24.1949 44.3199Z"
                    />
                </svg>

                {/* Бейдж с количеством уведомлений */}
                <span className="
                    absolute top-0 right-0
                    text-white-10 font-extrabold text-[10px]
                    bg-red-10 rounded-full
                    w-4 h-4
                    flex items-center justify-center
                    group-hover:scale-150
                    transition duration-300 ease-in-out"
                >
                    1
                </span>

                {/* Toast-уведомление - исправленная часть */}
                <div className="
                    flex flex-col gap-2.5
                    absolute z-20 top-full right-0 mt-2
                    text-sm shadow-toast
                    min-w-[220px] w-full max-w-xs
                    bg-white-10 rounded-2xl p-3.5
                    opacity-0 invisible
                    group-hover:opacity-100 group-hover:visible
                    transition-all duration-300
                    transform -translate-y-1 group-hover:translate-y-0"
                >
                    <span className="text-gray-10">
                        У вас новое сообщение
                    </span>
                    <Link
                        to="/chat"
                        className="
                            text-white-10 bg-blue-10
                            rounded-[10px] py-2 px-4
                            text-center
                            hover:bg-purple-20
                            transition duration-300 ease-in-out"
                    >
                        Ответить
                    </Link>
                </div>
            </div>

            {/* Профиль пользователя */}
            <div className="flex items-center gap-x-3.5">
                <div className="text-sm font-medium text-right max-w-20 w-full">
                    Андрей Васильев
                </div>
                <div className="w-0.5 h-10 bg-gray-20"></div>
                <Link to="/profile">
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer fill-blue-10 hover:fill-purple-20 transition duration-300 ease-in-out"
                    >
                        <path
                            d="M25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25
                            50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0ZM25
                            27.5C21.6848 27.5 18.5053 28.8169 16.1611 31.1611C13.8169
                            33.5053 12.5 36.6848 12.5 40H37.5C37.5 36.6848 36.1831 33.5053
                            33.8389 31.1611C31.4947 28.817 28.3152 27.5 25 27.5ZM24.6875
                            10C20.3729 10.0002 16.875 13.4979 16.875 17.8125C16.875 22.1271
                            20.3729 25.6248 24.6875 25.625C29.0022 25.625 32.5 22.1272 32.5
                            17.8125C32.5 13.4978 29.0022 10 24.6875 10Z"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    )
}