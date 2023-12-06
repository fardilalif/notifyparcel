import { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const loaderData = useLoaderData();
  if (!loaderData) return null;
  const {
    meta: { page, totalPages },
  } = loaderData;
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs md:btn-sm border-none join-item ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    // dots
    if (page > 2) {
      pageButtons.push(
        <button className="btn btn-xs sm:btn-sm join-item" key="dots-1">
          ...
        </button>
      );
    }

    // current page
    if (page !== 1 && page !== totalPages) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    // dots
    if (page < totalPages - 1) {
      pageButtons.push(
        <button className="btn btn-xs sm:btn-sm join-item" key="dots-2">
          ...
        </button>
      );
    }

    // last button
    if (totalPages !== 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: totalPages,
          activeClass: page === totalPages,
        })
      );
    }

    return pageButtons;
  };

  return (
    <div className="mt-4 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-sm join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = totalPages;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-sm join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > totalPages) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default PaginationContainer;
