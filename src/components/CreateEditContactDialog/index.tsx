import React, { useState } from "react";
import Dialog, { DialogContent, DialogHeader } from "./index.styles";
import { ContactListInterface } from "../../services/list";
import { ReactComponent as CloseIcon } from "../../assets/close_icon.svg";
import FormInput from "../FormInput";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { EDIT_CONTACT_BY_ID } from "../../services/edit";
import { ADD_CONTACT_WITH_PHONES } from "../../services/create";

interface CreateEditContactDialogProps {
  open: boolean;
  contact?: ContactListInterface;
  contactList: ContactListInterface[];
  setContactList: (args: ContactListInterface[]) => void;
}
const CreateEditContactDialog: React.FC<CreateEditContactDialogProps> = ({
  open,
  contact,
  contactList,
}) => {
  const {
    register,
    handleSubmit,
    setError,
		reset,
    formState: { errors },
  } = useForm<ContactListInterface>({
    defaultValues: {
      first_name: contact?.first_name || "",
      last_name: contact?.last_name || "",
      phones: contact?.phones || [],
    },
  });

	const [editContactById] = useMutation(EDIT_CONTACT_BY_ID);
	const [addContactWithPhones] = useMutation(ADD_CONTACT_WITH_PHONES)

  const onSubmit = (data: ContactListInterface) => {
		console.log(data)
    if (
      contactList.find(
        (contact) => contact.first_name === data.first_name && contact.last_name === data.last_name
      )
    ) {
      setError("first_name", { type: "custom", message: "Name must be unique" });
      setError("last_name", { type: "custom", message: "Name must be unique" });
			return;
    } else {
			if (contact) {
				editContactById({
					variables: {
						id: contact.id,
						_set: {
							first_name: data.first_name,
							last_name: data.last_name,
						}
					}
				})
			} else {
				addContactWithPhones({
					variables: {
						first_name: data.first_name,
						last_name: data.last_name,
						phones: data.phones.filter((phone) => phone.number),
					}
				})
			}
			reset()
		}
  };
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <h2>{contact ? "Edit" : "Create"} Contact</h2>
          <CloseIcon width={36} height={36} />
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            {...register("first_name")}
            pattern="^[a-zA-Z0-9]+$"
            patternMessage="Alphanumeric only"
            label="First Name"
          />
          <FormInput
            {...register("last_name")}
            pattern="^[a-zA-Z0-9]+$"
            patternMessage="Alphanumeric only"
            label="Last Name"
          />
          <FormInput {...register("phones.0.number")} label="Phone Number" />
          <FormInput {...register("phones.1.number")} />
          <FormInput {...register("phones.2.number")} />
          <button type="submit">SAVE</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditContactDialog;
