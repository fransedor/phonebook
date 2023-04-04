import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export const IconButton = styled.button`
	padding: 4px;
  background-color: #0291ee;
  color: white;
	border: 0;
	border-radius: 4px;
	&:hover {
		cursor: pointer;
		background-color: #50b6fa;
	}
	&:disabled {
		background-color: #ddd;
		cursor: not-allowed;
	}
`

export const PageNumber = styled.p`
  width: 32px;
  height: 32px;
	font-weight: bold;
	border-radius: 4px;
	line-height: 32px;
	padding: auto 0px;
	text-align: center;
	background-color: ${(props: { active: boolean }) => props.active ? "#ddd" : "#fff"};
  &:hover {
    cursor: pointer;
		background-color: #eee;
  }
`;
export default PaginationContainer;
