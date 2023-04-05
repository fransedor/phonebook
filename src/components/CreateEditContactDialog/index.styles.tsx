import styled from "styled-components";

const Dialog = styled.div`
	position: fixed;
	display: ${(props: { open: boolean}) => props.open ? "flex" : "none"};
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0,0.3);
	@media screen and (max-width: 600px) {
		align-items: end;
	}
`

export const StyledErrorMessage = styled.p`
	font-size: 12px;
	color: red;
`

export const DialogContent = styled.div`
	background-color: white;
	width: 600px;
	height: 600px;
	padding: 24px;
	border-radius: 1rem;
	@media screen and (max-width: 600px) {
		border-radius: 1rem 1rem 0 0;
		width: 100vw;
		height: 60vh;
	}
`

export const DialogHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`
export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 90%;
`

export const StyledButton = styled.button`
	font-weight: bold;
	border: 0;
	border-radius: 8px;
	padding: 8px 12px;
	width: 100px;
	margin-left: auto;
	box-shadow: 1px 2px 5px #333;
	background-color: #0291ee;
	color: white;
	&:hover {
		cursor: pointer;
		background-color: #50b6fa;
	}
`
export default Dialog;