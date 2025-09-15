function Pagination({ totalPages,  current, handleChangePage } : { totalPages: number, current: number, handleChangePage: (page: number) => void }) {
    const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);
    return (
        totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
                {current !== 1 && (
                    <button
                        className={`px-3 py-2 rounded-lg  text-gray-700 font-medium transition ${current === 1 ? 'bg-white border border-gray-200':" bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => {handleChangePage(current - 1)}}
                    >
                        {'<'}
                    </button>
                )}
                {pages.map((page) => (
                    <button
                        key={page}
                        className={`px-4 py-2 rounded-lg font-medium transition ${page === current ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        onClick={() => handleChangePage(page)}
                    >
                        {page}
                    </button>
                ))}
                {current !== pages.length && (
                    <button
                        className={`px-3 py-2 rounded-lg text-gray-700 font-medium transition ${current === pages.length ? 'bg-white border border-gray-200':" bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => {handleChangePage(current + 1)}}
                    >
                        {">"}
                    </button>
                )}
            </div>
        )


    );
}

export default Pagination;
