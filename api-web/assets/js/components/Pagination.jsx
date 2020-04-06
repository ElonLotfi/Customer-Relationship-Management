import React from "react";

//<Pagination currentPage={currentPage} customer={customer} handleChangePage={handleChangePage} />
const pagination = ({
  currentPage,
  customer,
  handleChangePage,
  itemPerPage,
}) => {
  const pageCount = Math.ceil(customer.length / itemPerPage); // le nombre de client par page
  console.log(pageCount);
  // maintenant je dois creer un tableau de page
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  console.log(pages);

  return (
    <>
      <div>
        <ul className="pagination pagination-sm">
          <li className={"page-item " + (currentPage === 1 && "disabled")}>
            <button
              className="page-link"
              onClick={() => handleChangePage(currentPage - 1)}
            >
              &laquo;
            </button>
          </li>
          {pages.map((page) => (
            <li
              className={"page-item " + (currentPage === page && "active")}
              key={page}
            >
              <button
                className="page-link"
                onClick={() => handleChangePage(page)}
              >
                {page}
              </button>
            </li>
          ))}

          <li
            className={"page-item " + (currentPage === pageCount && "disabled")}
          >
            <button
              className="page-link"
              onClick={() => handleChangePage(currentPage + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

// une proprieter sert a recuperer des donnée afin d'assuer la pagination
pagination.getData = (items, itemPerPage, currentPage) => {
  const start = currentPage * itemPerPage - itemPerPage;
  return items.slice(start, start + itemPerPage);
};

export default pagination;
