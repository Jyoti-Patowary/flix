import * as React from 'react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

function Content({ setPage, numOfPages = 10} ) {

  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
    }}
  >
    <Pagination
     onChange={(e) => handlePageChange(e.target.textContent)}
      count={numOfPages}
      hideNextButton
      hidePrevButton
     
    />
    </div>
  );
}

export default Content;
