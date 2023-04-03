import React from 'react'
import Dialog, { DialogContent, DialogHeader } from './index.styles'
import { ContactListInterface } from '../../services/list';
import { ReactComponent as CloseIcon } from "../../assets/close_icon.svg";
import FormInput from '../FormInput';

interface CreateEditContactDialogProps {
	open: boolean;
	contact?: ContactListInterface
}
const CreateEditContactDialog:React.FC<CreateEditContactDialogProps> = ({ open, contact }) => {
	return (
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<h2>{contact ? "Edit" : "Create"} Contact</h2>
					<CloseIcon width={36} height={36}/>
				</DialogHeader>
				<FormInput value='firstName' label='First Name' id="first_name"></FormInput>
				<FormInput value='firstName' label='Last Name' id="last_name"></FormInput>
				<FormInput value='firstName' label='Phone Number' id="phone"></FormInput>
				<FormInput value='firstName' id="phone2"></FormInput>	
			</DialogContent>
		</Dialog>
	)
}

export default CreateEditContactDialog