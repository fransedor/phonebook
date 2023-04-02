import React from "react";
import PaginationContainer, { PageNumber, StyledBeforeIcon, StyledNextIcon } from "./index.styles";

interface PaginationProps {
  totalPages: number;
  onBefore: () => void;
  onNext: () => void;
  onClickPage: (pageNumber: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ totalPages, onBefore, onNext, onClickPage }) => {
  const renderedPagination = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }
    return pages;
  };
  return (
    <PaginationContainer>
      <StyledBeforeIcon width={24} height={24} />
      {renderedPagination().map((pageNumber) => (
        <PageNumber key={pageNumber} onClick={() => onClickPage(pageNumber)}>
          {pageNumber}
        </PageNumber>
      ))}
      <StyledNextIcon width={24} height={24} />
    </PaginationContainer>
  );
};

export default Pagination;
