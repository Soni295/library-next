export function generatePagination(currentPage = 30, totalPages = 100) {
  const numberOfPages = Math.min(5, totalPages);

  let start = 1;

  if (currentPage > 3) {
    start = currentPage - 2; // es para centrarlo en la posicion del medio [x, x, o, x, x]

    if (totalPages - 3 == start) {
      start = currentPage - 3;
    }
  }

  if (currentPage === totalPages) {
    start = totalPages + 1 - numberOfPages;
  }

  const pagesItem = new Array(numberOfPages).fill(1).map((_, i) => ({
    page: start + i,
    disabled: currentPage === start + i,
  }));

  return pagesItem;
}
