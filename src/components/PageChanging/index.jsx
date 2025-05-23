import styles from "./styles.module.css";
export default function PageChanging({ currentPage, totalPages, changePage }) {
    const getPageNumbers = () => {
        let pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };
    return (
        <div className={styles.pagination}>
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 0}
            >
                &laquo; Anterior
            </button>
            {getPageNumbers().map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => changePage(pageNumber)}
                    className={currentPage === pageNumber ? `${styles.active}` : ""}
                >
                    {pageNumber + 1}
                </button>
            ))}
            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            >
                Próximo &raquo;
            </button>
        </div>
    )
}