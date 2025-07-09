import {useTitle} from "../../shared/hooks/useTitle.tsx";
import {SearchForm} from "../../features/search/components/SearchForm.tsx";
import {ResumeCard} from "../../features/resume/components/ResumeCard.tsx";
import {FilterTags} from "../../features/search/components/FilterTags.tsx";
import {Pagination} from "../../shared/components/Pagination/Pagination.tsx";
import {useMemo, useState} from "react";
import {tagsData} from "../../tempData/tempData.client.ts";

export const HomePage = () => {
    useTitle("HomePage");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const tempArray = Array.from({length: 8}, (_, index) => index + 1);

    // Рассчитываем данные для пагинации
    const { currentItems, totalPages } = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedItems = tempArray.slice(startIndex, endIndex);

        return {
            currentItems: slicedItems,
            totalPages: Math.ceil(tempArray.length / itemsPerPage)
        };
    }, [currentPage, tempArray]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Прокрутка к верху списка при смене страницы
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <SearchForm/>
            <div className="mt-8.5 flex gap-35">
                <div className="flex flex-col gap-2.5">
                    <h2 className="text-3xl font-semibold">По специализации</h2>
                    <FilterTags tags={tagsData}/>
                </div>
                <div className="max-w-[820px] w-full flex flex-col gap-2.5">
                    <h2 className="text-3xl font-semibold">Список резюме по запросу “Frontend developer...”</h2>
                    <div className="flex flex-col gap-7.5 mb-8">
                        {currentItems.map((item) => <ResumeCard adaptability="xl" key={item}/>)}
                    </div>
                    <div className="flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>


        </>
    )
};