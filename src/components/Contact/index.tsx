import React from "react";
import ContactContainer, { ContactActionContainer, ContactInfo } from "./index.styles";
import { ReactComponent as PersonIcon } from "../../assets/person_icon.svg";
import { ReactComponent as HeartPlusIcon } from "../../assets/heart_plus_icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete_icon.svg";
import { ReactComponent as EditIcon } from "../../assets/edit_icon.svg";
import type { ContactDetailType, PhoneNumberType } from "../../services/list";

interface ContactProps {
  contact: ContactDetailType & { phones: PhoneNumberType[] };
}
const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <ContactContainer>
      <PersonIcon width={24} height={24} style={{ backgroundColor: "#444", padding: "2px", borderRadius: "100%", color: "white" }} />
      <ContactInfo>
        <p>{`${contact.first_name} ${contact.last_name}`}</p>
      </ContactInfo>
      <ContactActionContainer>
        <EditIcon width={16}/>
        <HeartPlusIcon width={16}/>
        <DeleteIcon width={16}/>
      </ContactActionContainer>
    </ContactContainer>
  );
};

export default Contact;
