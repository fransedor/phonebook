import React from "react";
import Dialog, { DialogContent, DialogHeader, StyledButton, StyledForm } from "./index.styles";
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
  const { register, handleSubmit, setError, reset } = useForm<ContactListInterface>({
    defaultValues: {
      first_name: contact?.first_name || "",
      last_name: contact?.last_name || "",
      phones: contact?.phones || [],
    },
  });

  const [editContactById] = useMutation(EDIT_CONTACT_BY_ID);
  const [addContactWithPhones] = useMutation(ADD_CONTACT_WITH_PHONES);

  const onSubmit = async (data: ContactListInterface) => {
    const contacts = client.readQuery({ query: GET_CONTACT_LIST });

    if (
      contacts && contacts.contact.find(
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
        });
      } else {
        addContactWithPhones({
          variables: {
            first_name: data.first_name,
            last_name: data.last_name,
            phones: data.phones.filter((phone) => phone.number),
          },
          onCompleted: () => refetch(),
        });
      }
      reset();
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
            <FormInput
              {...register("last_name")}
              pattern="^[a-zA-Z0-9]+$"
              patternMessage="Alphanumeric only"
              label="Last Name"
            />
            <FormInput {...register("phones.0.number")} label="Phone Number" />
            <FormInput {...register("phones.1.number")} />
            <FormInput {...register("phones.2.number")} />
          </div>
          <StyledButton type="submit" data-testid="submit-form">Save</StyledButton>
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditContactDialog;
