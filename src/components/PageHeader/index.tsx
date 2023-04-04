import React, { useState } from "react";
import HeaderContainer, { InputContainer, StyledAddButton, StyledInput, StyledSearchIcon } from "./index.styles";
import CreateEditContactDialog from "../CreateEditContactDialog";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "../../services/list";

interface PageHeaderProps {
  searchValue: string;
  setSearchValue: (args: string) => void;
}
const PageHeader: React.FC<PageHeaderProps> = ({ searchValue, setSearchValue }) => {
  const [openCreateContactDialog, setOpenCreateContactDialog] = useState(false);
  const { refetch } = useQuery(GET_CONTACT_LIST);

  return (
    <HeaderContainer>
      <InputContainer>
				<StyledSearchIcon width={24} height={24}/>
        <StyledInput
          type="text"
          aria-label="search-contacts"
          name="search-contacts"
          placeholder="Search contact name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </InputContainer>
      <StyledAddButton onClick={() => setOpenCreateContactDialog(true)} width={24} height={24} />
      <CreateEditContactDialog
        open={openCreateContactDialog}
        onClose={() => setOpenCreateContactDialog(false)}
        refetch={refetch}
      />
    </HeaderContainer>
  );
};

export default PageHeader;
