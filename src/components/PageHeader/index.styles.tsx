import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../assets/add_icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/search_icon.svg";

const HeaderContainer = styled.div`
  display: flex;
	align-items: center;
  gap: 8px;
	margin-top: 16px;
`;

export const StyledAddButton = styled(AddIcon)`
  color: white;
  background-color: #0291ee;
	padding: 4px;
	border-radius: 100%;
`;

export const InputContainer = styled.div`
	/*padding: 8px 12px;*/
	display: flex;
	align-items: center;
	border-radius: 8px;
	border: 1px solid #333;
	width: 400px;
	@media screen and (max-width:600px) {
		width: 100%;
	}
`

export const StyledSearchIcon = styled(SearchIcon)`
	padding: 4px 8px;
	border-right: 1px solid #333;
`
export const StyledInput = styled.input`
	width: 100%;
	border: 0;
	margin: 0;
	&:focus {
		outline: none;
	}
`

export default HeaderContainer;
