import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ContactListInterface, GET_CONTACT_LIST } from "./services/list";
import SectionHeader from "./components/SectionHeader";
import PageContainer from "./components/PageContainer";
import Contact from "./components/Contact";
import Pagination from "./components/Pagination";
import CreateEditContactDialog from "./components/CreateEditContactDialog";
import { DELETE_CONTACT_BY_ID } from "./services/delete";
import PageHeader from "./components/PageHeader";

function App() {
  const localStorageContacts = localStorage.getItem("contacts");
  const { loading, error, data, refetch } = useQuery(GET_CONTACT_LIST);
  const [deleteContactById] = useMutation(DELETE_CONTACT_BY_ID);
  const [searchValue, setSearchValue] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [favoriteList, setFavoriteList] = useState<ContactListInterface[]>([]);
  const [contactList, setContactList] = useState<ContactListInterface[]>(
    localStorageContacts ? JSON.parse(localStorageContacts) : []
  );

  const renderFavoriteList = useCallback(() => {
    if (!searchValue) {
      return favoriteList;
    } else {
      return favoriteList.filter((contact) =>
        `${contact.first_name} ${contact.last_name}`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }
  }, [searchValue, favoriteList]);

  const renderContactList = useCallback(() => {
    if (!searchValue) {
      return contactList.slice(pageIndex * 10, (pageIndex + 1) * 10);
    } else {
      return contactList
        .filter((contact) =>
          `${contact.first_name} ${contact.last_name}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
        .slice(pageIndex * 10, (pageIndex + 1) * 10);
    }
  }, [searchValue, contactList, pageIndex]);

  useEffect(() => {
    if (data) {
      // Remove favorites from contact list
      setContactList(data.contact);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contactList));
  }, [contactList]);

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

  const deleteHandler = (id: number) => {
    deleteContactById({ variables: { id }, onCompleted: () => refetch() });
  };

  const pageClickHandler = (pageNumber: number) => {
    setPageIndex(pageNumber - 1);
  };
	
  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {data && (
        <PageContainer>
          <PageHeader searchValue={searchValue} setSearchValue={setSearchValue} />
          <section>
            <SectionHeader>Favorites</SectionHeader>
            {renderFavoriteList().map((favContact) => (
              <Contact
                refetch={refetch}
                contact={favContact}
                key={favContact.id}
                onDelete={deleteHandler}
                onFavorite={favoriteHandler}
                isFavorite
              />
            ))}
          </section>
          <section>
            <SectionHeader>Contact List</SectionHeader>
            {renderContactList().map((contact) => (
              <Contact
                contact={contact}
                key={contact.id}
                onFavorite={favoriteHandler}
                onDelete={deleteHandler}
                refetch={refetch}
              />
            ))}
            <Pagination
              totalPages={Math.ceil((data.contact.length - favoriteList.length) / 10)}
              onBefore={() => {
                setPageIndex(pageIndex - 1);
              }}
              onNext={() => {
                setPageIndex(pageIndex + 1);
              }}
              onClickPage={pageClickHandler}
              currentPageIndex={pageIndex}
            />
          </section>
        </PageContainer>
      )}
    </div>
  );
}

export default App;
