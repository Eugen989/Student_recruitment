import {useTitle} from "../../shared/hooks/useTitle.tsx";

export const PageNotFound = () => {
    useTitle("ErrorPage");

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="w-[430px] h-[300px] pl-[42px] mt-[65px] bg-[white] rounded-[15px]">
                    <p className="text-[32px] font-semibold font-manrope"><span className="text-[128px] text-[blue] font-bold">404</span> ошибка</p>

                    <p className="w-[375px] text-[24px] font-semibold font-manrope">Данная страница не найдена!
                        Повторите попытку позже.</p>
                </div>
            </div>
        </>
    )
};