import React, { useState } from "react";
import ContactContainer, { ContactActionContainer, ContactInfo, PhoneNumber } from "./index.styles";
import { ReactComponent as PersonIcon } from "../../assets/person_icon.svg";
import { ReactComponent as HeartPlusIcon } from "../../assets/heart_plus_icon.svg";
import { ReactComponent as HeartMinusIcon } from "../../assets/heart_minus_icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete_icon.svg";
import { ReactComponent as EditIcon } from "../../assets/edit_icon.svg";
import type {
  ContactDetailType,
  ContactListVariables,
  GetContactListResponse,
  PhoneNumberType,
} from "../../services/list";
import CreateEditContactDialog from "../CreateEditContactDialog";
import { ApolloQueryResult } from "@apollo/client";

interface ContactProps {
  contact: ContactDetailType & { phones: PhoneNumberType[] };
  onFavorite: (contact: ContactDetailType & { phones: PhoneNumberType[] }) => void;
  onEdit?: VoidFunction;
  onDelete: (contactId: number) => void;
  isFavorite?: boolean;
  refetch: (
    variables?: Partial<ContactListVariables> | undefined
  ) => Promise<ApolloQueryResult<GetContactListResponse>>;
}
const Contact: React.FC<ContactProps> = ({ contact, onFavorite, isFavorite, refetch, onDelete }) => {
  const [openEditContactDialog, setOpenEditContactDialog] = useState(false);

  return (
    <>
      <ContactContainer>
        {/*<PersonIcon width={24} height={24} style={{ backgroundColor: "#444", padding: "2px", borderRadius: "100%", color: "white" }} />*/}
        <ContactInfo>
          <p>{`${contact.first_name} ${contact.last_name}`}</p>
          <div>
            {contact.phones.map((phone, index) => (
              <PhoneNumber key={phone.number}>
                {phone.number} {index === contact.phones.length - 1 ? "" : "\u2022 "}
              </PhoneNumber>
            ))}
          </div>
        </ContactInfo>
        <ContactActionContainer>
          <EditIcon width={16} onClick={() => setOpenEditContactDialog(true)}/>
          {isFavorite ? (
            <HeartMinusIcon width={16} onClick={() => onFavorite(contact)} />
          ) : (
            <HeartPlusIcon width={16} onClick={() => onFavorite(contact)} />
          )}
          <DeleteIcon width={16} onClick={() => onDelete(contact.id)}/>
        </ContactActionContainer>
      </ContactContainer>
      <CreateEditContactDialog
        onClose={() => setOpenEditContactDialog(false)}
        open={openEditContactDialog}
        contact={contact}
        refetch={refetch}
      />
    </>
  );
};

export default Contact;
