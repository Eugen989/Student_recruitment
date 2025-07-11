import {useTitle} from "../../shared/hooks/useTitle.tsx";
import {SearchForm} from "../../features/search/components/SearchForm.tsx";
import {ResumeCard} from "../../features/resume/components/ResumeCard.tsx";
import {FilterTags} from "../../features/search/components/FilterTags.tsx";
//import {Pagination} from "../../shared/components/Pagination/Pagination.tsx";
//import {useMemo} from "react";
import {useEffect, useState} from "react";
import {getAllResumeAPI, getAllTagsAPI} from "../../features/resume/api/resumeAPI.client.ts";
import type {BackendResume, Tags} from "../../features/resume/type/Search.type.ts";

export const HomePage = () => {
    useTitle("Список резюме");
    const [resumes, setResumes] = useState<BackendResume[]>([]);
    const [allTags, setAllTags] = useState<Tags[]>([]);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await getAllResumeAPI();
                setResumes(response);
            } catch (error) {
                console.error("Error fetching resumes:", error);
            }
        }

        const fetchTags = async () => {
            try {
                const response = await getAllTagsAPI();
                setAllTags(response.tegs);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        }

        fetchResumes();
        fetchTags()
    }, []);

    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 5;
    //
    // const tempArray = Array.from({length: 8}, (_, index) => index + 1);
    //
    // const { totalPages } = useMemo(() => {
    //     const startIndex = (currentPage - 1) * itemsPerPage;
    //     const endIndex = startIndex + itemsPerPage;
    //     const slicedItems = tempArray.slice(startIndex, endIndex);
    //
    //     return {
    //         currentItems: slicedItems,
    //         totalPages: Math.ceil(tempArray.length / itemsPerPage)
    //     };
    // }, [currentPage, tempArray]);
    //
    // const handlePageChange = (page: number) => {
    //     setCurrentPage(page);
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // };

    return (
        <>
            <SearchForm
                tags={allTags}
                onSubmit={() => {}}
            />
            <div className="mt-8.5 flex gap-35">
                <div className="flex flex-col gap-2.5">
                    <h2 className="text-3xl font-semibold">По специализации</h2>
                    <FilterTags tags={allTags}/>
                </div>
                <div className="max-w-[820px] w-full flex flex-col gap-2.5">
                    <h2 className="text-3xl font-semibold">{`Список резюме"`}</h2>
                    <div className="flex flex-col gap-7.5 mb-8">
                        {resumes.map((resume) => (
                            <ResumeCard
                                key={resume.id}
                                adaptability="xl"
                                id={resume.id}
                                userName={resume.user?.name}
                                salary={resume.salary}
                                description={resume.description}
                                tags={resume.tegs}
                                projectCount={resume.projectCount}
                                imageUrl={resume.user?.image}
                            />
                        ))}
                    </div>
                    {/*<div className="flex justify-center">*/}
                    {/*    <Pagination*/}
                    {/*        currentPage={currentPage}*/}
                    {/*        totalPages={totalPages}*/}
                    {/*        onPageChange={handlePageChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
            </div>


        </>
    )
};