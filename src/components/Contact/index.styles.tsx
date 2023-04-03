import styled from "styled-components";

const ContactContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 1px solid black;
`
export const ContactInfo = styled.div`
	display: flex;
	flex-direction: column;
`

export const PhoneNumber = styled.span`
	color: #444;
	font-size: 12px;
`

export const ContactActionContainer = styled.div`
	display: flex;
	gap: 8px;
`
export default ContactContainer