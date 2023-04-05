import React from "react";
import Dialog, {
  DialogContent,
  DialogHeader,
  StyledButton,
  StyledErrorMessage,
  StyledForm,
} from "./index.styles";
import {
  ContactListInterface,
  ContactListVariables,
  GET_CONTACT_LIST,
  GetContactListResponse,
} from "../../services/list";
import { ReactComponent as CloseIcon } from "../../assets/close_icon.svg";
import FormInput from "../FormInput";
import { useForm } from "react-hook-form";
import { ApolloQueryResult, useMutation } from "@apollo/client";
import { EDIT_CONTACT_BY_ID } from "../../services/edit";
import { ADD_CONTACT_WITH_PHONES } from "../../services/create";
import client from "../../services/client";
import { ADD_NUMBER_TO_CONTACT } from "../../services/create";
import { EDIT_PHONE_NUMBER } from "../../services/edit";

interface CreateEditContactDialogProps {
  open: boolean;
  onClose: () => void;
  contact?: ContactListInterface;
  refetch: (
    variables?: Partial<ContactListVariables> | undefined
  ) => Promise<ApolloQueryResult<GetContactListResponse>>;
}
const CreateEditContactDialog: React.FC<CreateEditContactDialogProps> = ({
  open,
  onClose,
  contact,
  refetch,
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
  const [addContactWithPhones] = useMutation(ADD_CONTACT_WITH_PHONES);
  const [addNumberToContact] = useMutation(ADD_NUMBER_TO_CONTACT);
  const [editPhoneNumber] = useMutation(EDIT_PHONE_NUMBER);

  const onSubmit = async (data: ContactListInterface) => {
    const contacts = client.readQuery({ query: GET_CONTACT_LIST });

    // Check if user add contact with not unique name
    if (
      contacts &&
      !contact &&
      contacts.contact.find(
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
            },
          },
          onCompleted: () => refetch(),
          onError: (error) => console.log(error),
        });
				data.phones.forEach((phone, i) => {
					// Check if there is existing number
					if (contact.phones[i]) {
						// Check if number is different
						if (contact.phones[i].number !== phone.number) {
							editPhoneNumber({
								variables: {
									pk_columns: {
										contact_id: contact.id,
										number: contact.phones[i].number
									},
									new_phone_number: phone.number
								},
								onCompleted: () => refetch()
							})
						}
					} else {
						// Add new phone number
						addNumberToContact({
							variables: {
								contact_id: contact.id,
								phone_number: phone.number
							},
							onCompleted: () => refetch()
						})
					}
				})
      } else {
        addContactWithPhones({
          variables: {
            first_name: data.first_name,
            last_name: data.last_name,
            phones: data.phones.filter((phone) => phone.number),
          },
          onCompleted: () => refetch(),
        });
				reset();
      }
      onClose();
    }
  };
  return (
    <Dialog open={open} onClick={onClose} data-testid="dialog">
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <h2>{contact ? "Edit" : "Create"} Contact</h2>
          <CloseIcon width={36} height={36} onClick={onClose} />
        </DialogHeader>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormInput
              {...register("first_name")}
              pattern="^[a-zA-Z0-9]+$"
              patternMessage="Alphanumeric only"
              label="First Name"
            />
            {errors.first_name && (
              <StyledErrorMessage>{errors.first_name.message}</StyledErrorMessage>
            )}
            <FormInput
              {...register("last_name")}
              pattern="^[a-zA-Z0-9]+$"
              patternMessage="Alphanumeric only"
              label="Last Name"
            />
            {errors.last_name && (
              <StyledErrorMessage>{errors.last_name.message}</StyledErrorMessage>
            )}
            <FormInput
              {...register("phones.0.number", { required: true })}
              label="Phone Number"
              pattern="^^(?:[+\d].*\d|\d)$"
              patternMessage="Number only"
            />
            {errors.phones && <StyledErrorMessage>Insert phone number</StyledErrorMessage>}
            <FormInput
              {...register("phones.1.number")}
              pattern="^^(?:[+\d].*\d|\d)$"
              patternMessage="Number only"
            />
            <FormInput
              {...register("phones.2.number")}
              pattern="^^(?:[+\d].*\d|\d)$"
              patternMessage="Number only"
            />
          </div>
          <StyledButton type="submit" data-testid="submit-form">
            Save
          </StyledButton>
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditContactDialog;
