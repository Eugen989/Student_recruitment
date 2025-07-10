import {useTitle} from "../../shared/hooks/useTitle.tsx";
import logoWithName from "../../assets/logoWithName.png";
import pointingMan from "../../assets/pointingMan.png";
import university from "../../assets/university.png";
import championships from "../../assets/championships.png";
import modernProgram from "../../assets/modernProgram.png";
import admin from "../../assets/admin.png";
import info from "../../assets/info.png";
import communication from "../../assets/communication.png";
import resume from "../../assets/resume.png";

export const LandingPage = () => {
    useTitle("LandingPage");

    return (
        <>
            <div className="">
                <div className="h-[680px] flex flex-col items-center">
                    <div className="flex gap-[21px] mb-[60px]">
                        <div className="w-[460px] h-[308px] flex gap-[20.4px] items-center justify-center bg-[white] rounded-[15px]">
                            <div>
                                <img src={logoWithName} alt=""/>
                            </div>
                            <p className="font-[Manrope] text-[32px]">
                                <span className="font-bold">С</span>ервис<br/>
                                <span className="font-bold">О</span>нлайн<br/>
                                <span className="font-bold">Р</span>екрутмента<br/>
                                <span className="font-bold">С</span>тудентов<br/>
                                <span className="font-bold">it.bgitu</span>
                            </p>
                        </div>

                        <div className="w-[459.9195251464844px] h-[524px]">
                            <img src={pointingMan} alt=""/>
                        </div>
                    </div>

                    <p className="font-semibold text-[48px]">Почему именно наши студенты?</p>
                </div>

                <div className="relative w-[1905px] h-[700px] ml-[-201px]">
                    <img src={university} className="w-[100%] h-[100%]" alt=""/>

                    <div className="absolute top-[200px] left-[655px] ml-auto mr-auto w-[610px] h-[300px] bg-[#344bc3] flex text-[white]">
                        <p className="mt-[22px] ml-[52px] text-[96px] font-bold ">1.</p>

                        <p className="mt-[85px] text-[36px] font-bold">Обучаем <br />
                            конкурентноспособных <br />
                            студентов</p>
                    </div>
                </div>

                <div className="relative w-[1905px] h-[700px] ml-[-201px]">
                    <img src={championships} className="w-[100%] h-[100%]" alt=""/>

                    <div className="absolute top-[200px] left-[655px] ml-auto mr-auto w-[610px] h-[300px] bg-[#344bc3] flex text-[white]">
                        <p className="mt-[22px] ml-[52px] text-[96px] font-bold ">2.</p>

                        <p className="mt-[85px] text-[36px] font-bold">Участвуем в кибер- <br />
                            спортивных <br />
                            мероприятиях</p>
                    </div>
                </div>

                <div className="relative w-[1905px] h-[700px] ml-[-201px]">
                    <img src={modernProgram} className="w-[100%] h-[100%]" alt=""/>

                    <div className="absolute top-[200px] left-[655px] ml-auto mr-auto w-[610px] h-[300px] bg-[#344bc3] flex text-[white]">
                        <p className="mt-[22px] ml-[52px] text-[96px] font-bold ">2.</p>

                        <p className="mt-[85px] text-[36px] font-bold">Создаём <br />
                            современную <br />
                            программу обучения</p>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-[60px]">
                    <p className="font-semibold text-[48px]">Наш сервис позволит Вам</p>

                    <div className="flex mt-[63px] gap-[20px]">
                        <div className="w-[340px] flex flex-col gap-[20px]">
                            <div className="h-[340px]">
                                <img src={admin} className="w-[100%] h-[100%]" alt="" />
                            </div>

                            <p className="text-[28px] text-center font-semibold">Быть на связи с администратором для решения возникших проблем</p>
                        </div>

                        <div className="w-[340px] flex flex-col gap-[20px]">
                            <div className="h-[340px]">
                                <img src={info} className="w-[100%] h-[100%]" alt="" />
                            </div>

                            <p className="text-[28px] text-center font-semibold">Просматривать информацию о рабочих проектах студентов</p>
                        </div>

                        <div className="w-[340px] flex flex-col gap-[20px]">
                            <div className="h-[340px]">
                                <img src={communication} className="w-[100%] h-[100%]" alt="" />
                            </div>

                            <p className="text-[28px] text-center font-semibold">Вести общение со студентами для уточнения любых деталей</p>
                        </div>

                        <div className="w-[340px] flex flex-col gap-[20px]">
                            <div className="h-[340px]">
                                <img src={resume} className="w-[100%] h-[100%]" alt="" />
                            </div>

                            <p className="text-[28px] text-center font-semibold">Искать и просматривать резюме студентов по критериям программирования</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};