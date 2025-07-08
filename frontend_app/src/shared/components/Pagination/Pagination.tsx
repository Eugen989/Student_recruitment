interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
                               currentPage,
                               totalPages,
                               onPageChange
                           }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const handlePageClick = (page: number) => {
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div
            className="
            flex items-center justify-center gap-7.5 justify-self-center
            max-w-92 w-full
            mt-7.5 p-2.5
            bg-white-10
            border border-gray-20
            rounded-2xl">
            <div className="flex items-center gap-2.5">
                <button
                    onClick={() => handlePageClick(1)}
                    disabled={isFirstPage}
                    className={`flex items-center justify-center rounded-[10px] border p-2 transition duration-300 ease-in-out group ${
                        isFirstPage
                            ? "border-gray-20 cursor-not-allowed"
                            : "border-gray-20 hover:bg-purple-20 hover:border-purple-20 active:bg-blue-10 active:scale-95 active:border-blue-10"
                    }`}
                    aria-label="Первая страница"
                >
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition duration-300 ease-in-out ${
                        isFirstPage
                            ? "fill-gray-20"
                            : "fill-gray-10 group-hover:fill-white-10 group-active:fill-white-10"
                    }`}>
                        <path d="M1.11612 9.11612C0.627961 9.60427 0.627961 10.3957 1.11612 10.8839L9.07107 18.8388C9.55922 19.327 10.3507 19.327 10.8388 18.8388C11.327 18.3507 11.327 17.5592 10.8388 17.0711L3.76777 10L10.8388 2.92893C11.327 2.44078 11.327 1.64932 10.8388 1.16117C10.3507 0.673011 9.55922 0.67301 9.07107 1.16117L1.11612 9.11612ZM3 10L3 8.75L2 8.75L2 10L2 11.25L3 11.25L3 10Z"/>
                    </svg>
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`ml-[-6px] transition duration-300 ease-in-out ${
                        isFirstPage
                            ? "fill-gray-20"
                            : "fill-gray-10 group-hover:fill-white-10 group-active:fill-white-10"
                    }`}>
                        <path d="M1.11612 9.11612C0.627961 9.60427 0.627961 10.3957 1.11612 10.8839L9.07107 18.8388C9.55922 19.327 10.3507 19.327 10.8388 18.8388C11.327 18.3507 11.327 17.5592 10.8388 17.0711L3.76777 10L10.8388 2.92893C11.327 2.44078 11.327 1.64932 10.8388 1.16117C10.3507 0.673011 9.55922 0.67301 9.07107 1.16117L1.11612 9.11612ZM3 10L3 8.75L2 8.75L2 10L2 11.25L3 11.25L3 10Z"/>
                    </svg>
                </button>
                <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={isFirstPage}
                    className={`flex items-center justify-center rounded-[10px] border p-2 transition duration-300 ease-in-out group ${
                        isFirstPage
                            ? "border-gray-20 cursor-not-allowed"
                            : "border-gray-20 hover:bg-purple-20 hover:border-purple-20 active:bg-blue-10 active:scale-95 active:border-blue-10"
                    }`}
                    aria-label="Предыдущая страница"
                >
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition duration-300 ease-in-out ${
                        isFirstPage
                            ? "fill-gray-20"
                            : "fill-gray-10 group-hover:fill-white-10 group-active:fill-white-10"
                    }`}>
                        <path d="M1.11612 9.11612C0.627961 9.60427 0.627961 10.3957 1.11612 10.8839L9.07107 18.8388C9.55922 19.327 10.3507 19.327 10.8388 18.8388C11.327 18.3507 11.327 17.5592 10.8388 17.0711L3.76777 10L10.8388 2.92893C11.327 2.44078 11.327 1.64932 10.8388 1.16117C10.3507 0.673011 9.55922 0.67301 9.07107 1.16117L1.11612 9.11612ZM3 10L3 8.75L2 8.75L2 10L2 11.25L3 11.25L3 10Z"/>
                    </svg>
                </button>
            </div>

            <div className="flex items-center gap-3.75">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`flex items-center justify-center text-xl rounded-[10px] border p-1 px-3 hover:bg-purple-20 hover:border-purple-20 hover:text-white-10 active:bg-blue-10 active:scale-95 active:border-blue-10 active:text-white-10 transition duration-300 ease-in-out group ${
                            currentPage === page
                                ? "bg-blue-10 text-white-10 font-bold border-blue-10"
                                : "bg-white-10 border border-gray-20"
                        }`}
                        aria-current={currentPage === page ? "page" : undefined}
                        aria-label={`Страница ${page}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3.75">
                <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={isLastPage}
                    className={`flex items-center justify-center rounded-[10px] border p-2 transition duration-300 ease-in-out group ${
                        isLastPage
                            ? "border-gray-20 cursor-not-allowed"
                            : "border-gray-20 hover:bg-purple-20 hover:border-purple-20 active:bg-blue-10 active:scale-95 active:border-blue-10"
                    }`}
                    aria-label="Следующая страница"
                >
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition duration-300 ease-in-out ${
                        isLastPage
                            ? "fill-gray-20"
                            : "fill-gray-10 group-hover:fill-white-10 group-active:fill-white-10"
                    }`}>
                        <path d="M10.8839 9.11612C11.372 9.60427 11.372 10.3957 10.8839 10.8839L2.92893 18.8388C2.44078 19.327 1.64932 19.327 1.16117 18.8388C0.67301 18.3507 0.67301 17.5592 1.16117 17.0711L8.23223 10L1.16117 2.92893C0.67301 2.44078 0.67301 1.64932 1.16117 1.16117C1.64932 0.67301 2.44078 0.67301 2.92893 1.16117L10.8839 9.11612ZM9 10V8.75H10V10V11.25H9V10Z"/>
                    </svg>
                </button>
                <button
                    onClick={() => handlePageClick(totalPages)}
                    disabled={isLastPage}
                    className={`flex items-center justify-center rounded-[10px] border p-2 transition duration-300 ease-in-out group ${
                        isLastPage
                            ? "border-gray-20 cursor-not-allowed"
                            : "border-gray-20 hover:bg-purple-20 hover:border-purple-20 active:bg-blue-10 active:scale-95 active:border-blue-10"
                    }`}
                    aria-label="Последняя страница"
                >
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition duration-300 ease-in-out ${
                        isLastPage
                            ? "fill-gray-20"
                            : "fill-gray-10 group-hover:fill-white-10 group-active:fill-white-10"
                    }`}>
                        <path d="M10.8839 9.11612C11.372 9.60427 11.372 10.3957 10.8839 10.8839L2.92893 18.8388C2.44078 19.327 1.64932 19.327 1.16117 18.8388C0.67301 18.3507 0.67301 17.5592 1.16117 17.0711L8.23223 10L1.16117 2.92893C0.67301 2.44078 0.67301 1.64932 1.16117 1.16117C1.64932 0.67301 2.44078 0.67301 2.92893 1.16117L10.8839 9.11612ZM9 10V8.75H10V10V11.25H9V10Z"/>
                    </svg>
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`ml-[-6px] transition duration-300 ease-in-out ${
                        isLastPage
                            ? "fill-gray-20"
                            : "fill-gray-10 group-hover:fill-white-10 group-active:fill-white-10"
                    }`}>
                        <path d="M10.8839 9.11612C11.372 9.60427 11.372 10.3957 10.8839 10.8839L2.92893 18.8388C2.44078 19.327 1.64932 19.327 1.16117 18.8388C0.67301 18.3507 0.67301 17.5592 1.16117 17.0711L8.23223 10L1.16117 2.92893C0.67301 2.44078 0.67301 1.64932 1.16117 1.16117C1.64932 0.67301 2.44078 0.67301 2.92893 1.16117L10.8839 9.11612ZM9 10V8.75H10V10V11.25H9V10Z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};