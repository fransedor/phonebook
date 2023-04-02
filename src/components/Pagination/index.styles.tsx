import styled from "styled-components";
import { ReactComponent as BeforeIcon } from "../../assets/navigate_before_icon.svg";
import { ReactComponent as NextIcon } from "../../assets/navigate_next_icon.svg";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export const StyledBeforeIcon = styled(BeforeIcon)`
  padding: 4px;
  background-color: #0291ee;
  color: white;
`;

export const StyledNextIcon = styled(NextIcon)`
  padding: 4px;
  background-color: #0291ee;
  color: white;
`;

export const PageNumber = styled.p`
  width: 32px;
  height: 32px;
	line-height: 32px;
	padding: auto 0px;
	text-align: center;
  &:hover {
    cursor: pointer;
		background-color: #eee;
  }
`;
export default PaginationContainer;
