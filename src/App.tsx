import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  ContactDetailType,
  ContactListInterface,
  GET_CONTACT_LIST,
  GET_PHONE_LIST,
  PhoneNumberType,
} from "./services/list";
import SectionHeader from "./components/SectionHeader";
import PageContainer from "./components/PageContainer";
import Contact from "./components/Contact";
import Autocomplete from "./components/Autocomplete";
import { ReactComponent as AddIcon } from "./assets/add_icon.svg";
import Pagination from "./components/Pagination";

function App() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);
  const [autocompleteInputValue, setAutocompleteInputValue] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [favoriteList, setFavoriteList] = useState<ContactListInterface[]>([]);
  const [contactList, setContactList] = useState<ContactListInterface[]>([]);

  const renderedContactList = useCallback(() => {
    if (data) {
      return data.contact.slice(pageIndex * 5, (pageIndex + 1) * 5);
    }
    return [];
  }, [data, pageIndex]);

  useEffect(() => {
    if (data) {
      setContactList(data.contact);
    }
  }, [data]);

  const favoriteHandler = useCallback(
    (contact: ContactListInterface) => {
      const currFavList = [...favoriteList];
      const isContactFavorite = currFavList.find((currFav) => currFav.id === contact.id);
      if (isContactFavorite) {
        setFavoriteList(currFavList.filter((currFav) => currFav.id !== contact.id));
        setContactList([...contactList, contact]);
      } else {
        setFavoriteList([...currFavList, contact]);
        setContactList(contactList.filter((currContact) => currContact.id !== contact.id));
      }
    },
    [favoriteList, contactList]
  );

  const pageClickHandler = (pageNumber: number) => {
    setPageIndex(pageNumber - 1);
  };
  console.log(data?.contact);
  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {data && (
        <PageContainer>
          <div style={{ display: "flex", gap: "8px" }}>
            <Autocomplete
              options={data?.contact!}
              optionLabel="first_name"
              inputValue={autocompleteInputValue}
            />
            <AddIcon />
          </div>
          <section>
            <SectionHeader>Favorites</SectionHeader>
            {favoriteList.map((favContact) => (
              <Contact
                contact={favContact}
                key={favContact.id}
                onFavorite={favoriteHandler}
								isFavorite
              />
            ))}
          </section>
          <section>
            <SectionHeader>Contact List</SectionHeader>
            {contactList.slice(pageIndex * 5, (pageIndex + 1) * 5).map((contact) => (
              <Contact contact={contact} key={contact.id} onFavorite={favoriteHandler} />
            ))}
            <Pagination
              totalPages={data.contact.length / 5}
              onBefore={() => {}}
              onNext={() => {}}
              onClickPage={pageClickHandler}
            />
          </section>
        </PageContainer>
      )}
    </div>
  );
}

export default App;
