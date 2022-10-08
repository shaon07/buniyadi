import React, { useState } from 'react';
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";
// import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

export default function Pagination({ productsPerPage, totalProducts, currentPage, setCurrentPage }) {
  const [pageNumLimit] = useState(5);
  const [maxPageNumLimit, setMaxPageNumLimit] = useState(5);
  const [minPageNumLimit, setMinPageNumLimit] = useState(0)

  // Getting Page Numbers
  let pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i)
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1)
    if (currentPage + 1 > maxPageNumLimit) {
      setMaxPageNumLimit(maxPageNumLimit + pageNumLimit);
      setMinPageNumLimit(minPageNumLimit + maxPageNumLimit)
    }
  }

  const handlePrev = () => {
    setCurrentPage(currentPage - 1)
    if ((currentPage - 1) % pageNumLimit === 0) {
      setMaxPageNumLimit(maxPageNumLimit - pageNumLimit);
      setMinPageNumLimit(minPageNumLimit - pageNumLimit);
    }
  }

  return (
    <nav className="d-flex justify-content-end pagination">
      <ul >
        <li>
          <button className="shadow-sm no-effect" onClick={handlePrev} disabled={currentPage === pageNumber[0] ? true : false}>
            <MdOutlineSkipPrevious />
          </button>
        </li>
        {
          minPageNumLimit >= 1 ? <li>
            <button className="shadow-sm no-effect">
              ....
            </button>
          </li> : null
        }
        {
          pageNumber?.map((number) => (
            number < maxPageNumLimit + 1 && number > minPageNumLimit ?
              <li key={number}>
                <button className={`shadow-sm ${currentPage === number ? 'active' : ''} `}
                  onClick={() => setCurrentPage(number)}>
                  {number}
                </button>
              </li>
              : null
          ))
        }
        {
          pageNumber.length > maxPageNumLimit ? <li>
            <button className="shadow-sm no-effect">
              ....
            </button>
          </li> : null
        }
        <li>
          <button className="shadow-sm no-effect" onClick={handleNext} disabled={currentPage === pageNumber[pageNumber.length - 1] ? true : false} >
            <MdOutlineSkipNext />
          </button>
        </li>
      </ul>
    </nav>
  )
}
