import React from "react";
import PaginationContainer, { IconButton, PageNumber } from "./index.styles";
import { ReactComponent as NextIcon } from "../../assets/navigate_next_icon.svg";
import { ReactComponent as BeforeIcon } from "../../assets/navigate_before_icon.svg";

interface PaginationProps {
  totalPages: number;
  onBefore: () => void;
  onNext: () => void;
  onClickPage: (pageNumber: number) => void;
  currentPageIndex: number;
}
const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onBefore,
  onNext,
  onClickPage,
  currentPageIndex,
}) => {
  const renderedPagination = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }
    return pages;
  };

	console.log(totalPages, currentPageIndex)
  return (
    <PaginationContainer>
      <IconButton disabled={currentPageIndex === 0} onClick={onBefore}>
        <BeforeIcon width={24} height={24} />
      </IconButton>
      {renderedPagination().map((pageNumber) => (
        <PageNumber
          key={pageNumber}
          onClick={() => onClickPage(pageNumber)}
          active={pageNumber === currentPageIndex + 1}
        >
          {pageNumber}
        </PageNumber>
      ))}
      <IconButton disabled={currentPageIndex === totalPages - 1} onClick={onNext}>
        <NextIcon width={24} height={24} />
      </IconButton>
    </PaginationContainer>
  );
};

export default Pagination;
