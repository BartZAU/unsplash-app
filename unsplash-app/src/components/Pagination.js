import React from "react";

const Pagination = ({ imagesPerPage = 0, totalImages = 0, paginate }) => {
  const pageNum = [];

  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pageNum.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNum.map((num) => (
          <div key={num}>
            <a href="#" onClick={() => paginate(num)}>
              {num}
            </a>
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
