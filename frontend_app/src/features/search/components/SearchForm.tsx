import {useState} from "react";

export const SearchForm = () => {
    const [specializations, setSpecializations] = useState([
        { id: 1, name: "Frontend developer", checked: false },
        { id: 2, name: "Backend developer", checked: false },
        { id: 3, name: "Software engineer", checked: false },
        { id: 4, name: "DevOps engineer", checked: false },
        { id: 5, name: "ML engineer", checked: false },
    ]);
    const [value, setValue] = useState(50000);
    const [isOpenAdvancedSearch, setIsOpenAdvancedSearch] = useState(false);

    const handleCheck = (id: number) => {
        setSpecializations((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleClickAdvancedSearch = () => {
        setIsOpenAdvancedSearch(!isOpenAdvancedSearch);
    };

    return (
        <form className="container mx-auto">
            <div className="flex items-start gap-5">
                <div className="flex-1 relative z-10">
                    <input
                        type="search"
                        placeholder="Поиск по ФИО, тегам, и чему-то там ещё..."
                        className="
                    w-full
                    outline-none
                    text-xl
                    border border-gray-20 rounded-2xl
                    py-3 px-7.5
                    bg-white-10"
                    />
                    {isOpenAdvancedSearch && (
                        <div
                            className="
                        bg-white-10
                        flex gap-25
                        rounded-2xl
                        absolute top-4 z-[-1]
                        w-full p-10
                        shadow-search"
                        >
                            <div className="flex flex-col gap-1.25">
                            <span className="text-xl">
                                По специализации
                            </span>
                                <ul>
                                    {specializations.map((spec) => (
                                        <li key={spec.id}>
                                            <label className="flex items-center cursor-pointer">
                                                <div
                                                    className={`
                                                    w-5 h-5 
                                                    border rounded 
                                                    flex items-center justify-center
                                                    transition duration-200
                                                    ${
                                                        spec.checked
                                                            ? 'bg-blue-10 border-blue-10'
                                                            : 'bg-white-10 border-gray-10'
                                                    }
                                                `}
                                                >
                                                    {spec.checked && (
                                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.65136 0.469656C8.94411 0.00141883 9.56198 -0.140406 10.0303 0.152274C10.4984 0.445029 10.6412 1.06197 10.3486 1.5302L5.34667 9.53118L4.63281 10.6738L3.74609 9.65911L0.247063 5.65911C-0.116378 5.24339 -0.0738709 4.61055 0.34179 4.247C0.757427 3.8839 1.38942 3.92639 1.75292 4.34173L4.36425 7.32903L8.65136 0.469656Z" fill="white"/>
                                                        </svg>


                                                    )}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={spec.checked}
                                                    name="specialization"
                                                    value={spec.id}
                                                    onChange={() => handleCheck(spec.id)}
                                                />

                                                <span className="ml-2">{spec.name}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4">
                            <span className="text-xl block mb-4">
                                По ожиданиям заработной платы
                            </span>
                                <label className="flex flex-col max-w-72 w-full">
                                    <div className="flex justify-between items-center mb-2">
                                    <span>
                                        {new Intl.NumberFormat('ru-RU').format(value)}р.
                                    </span>
                                        <span>100000р.</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100000"
                                        value={value}
                                        onChange={(e) => (
                                            setValue(Number(e.target.value))
                                        )}
                                        className="w-full"
                                    />
                                </label>
                            </div>
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    className="
                        cursor-pointer
                        bg-white-10
                        rounded-2xl
                    "
                    onClick={handleClickAdvancedSearch}
                >
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
                            d="M35 0C43.2843 3.22129e-07 50 6.71573 50 15V35C50 43.2843 43.2843
                        50 35 50H15C6.71573 50 3.2215e-07 43.2843 0 35V15C3.2215e-07 6.71573
                        6.71573 3.22129e-07 15 0H35ZM7 36H43V32H7V36ZM33 20C30.2386 20 28
                        22.2386 28 25C28 27.7614 30.2386 30 33 30C35.7614 30 38 27.7614 38
                        25C38 22.2386 35.7614 20 33 20ZM33 22C34.6569 22 36 23.3431 36 25C36
                        26.6569 34.6569 28 33 28C31.3431 28 30 26.6569 30 25C30 23.3431 31.3431
                        22 33 22ZM7 27H26V23H7V27ZM40 27H43V23H40V27ZM19 11C16.2386 11 14 13.2386
                        14 16C14 18.7614 16.2386 21 19 21C21.7614 21 24 18.7614 24 16C24 13.2386
                        21.7614 11 19 11ZM19 13C20.6569 13 22 14.3431 22 16C22 17.6569 20.6569 19
                        19 19C17.3431 19 16 17.6569 16 16C16 14.3431 17.3431 13 19 13ZM7
                        18H12V14H7V18ZM26 18H43V14H26V18Z"
                        />
                    </svg>
                </button>
                <button type="submit" className="cursor-pointer bg-white-10 rounded-2xl">
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
                            d="M35 0C43.2843 3.22129e-07 50 6.71573 50 15V35C50 43.2843 43.2843
                        50 35 50H15C6.71573 50 3.2215e-07 43.2843 0 35V15C3.2215e-07 6.71573
                        6.71573 3.22129e-07 15 0H35ZM31.4561 13.4854C26.7698 8.79916 19.1716
                        8.7992 14.4854 13.4854C9.79908 18.1716 9.79911 25.7698 14.4854
                        30.4561C18.6897 34.6601 25.2366 35.0906 29.9229 31.751L38.8984
                        40.7275L41.7275 37.8994L32.751 28.9229C36.0905 24.2366 35.6601
                        17.6897 31.4561 13.4854ZM17.0303 16.0303C20.3106 12.7501 25.6298
                        12.7501 28.9102 16.0303C32.1905 19.3106 32.1904 24.6297 28.9102
                        27.9102C25.6298 31.1906 20.3107 31.1906 17.0303 27.9102C13.7501
                        24.6297 13.7499 19.3106 17.0303 16.0303Z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    )
}