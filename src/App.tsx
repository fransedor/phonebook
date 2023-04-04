import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ContactListInterface, GET_CONTACT_LIST } from "./services/list";
import SectionHeader from "./components/SectionHeader";
import PageContainer from "./components/PageContainer";
import Contact from "./components/Contact";
import { ReactComponent as AddIcon } from "./assets/add_icon.svg";
import Pagination from "./components/Pagination";
import CreateEditContactDialog from "./components/CreateEditContactDialog";
import { DELETE_CONTACT_BY_ID } from "./services/delete";

function App() {
  const localStorageFavorites = localStorage.getItem("favorites");
  const localStorageContacts = localStorage.getItem("contacts");
  const { loading, error, data, refetch } = useQuery(GET_CONTACT_LIST);
  const [deleteContactById] = useMutation(DELETE_CONTACT_BY_ID);
  const [searchValue, setSearchValue] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [favoriteList, setFavoriteList] = useState<ContactListInterface[]>(
    localStorageFavorites ? JSON.parse(localStorageFavorites) : []
  );
  const [contactList, setContactList] = useState<ContactListInterface[]>(
    localStorageContacts ? JSON.parse(localStorageContacts) : []
  );
  const [openCreateContactDialog, setOpenCreateContactDialog] = useState(false);

  useEffect(() => {
    if (data) {
      setContactList(data.contact);
    }
  }, [data]);

  useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(favoriteList));
  }, [favoriteList]);

	useEffect(() => {
		localStorage.setItem("contacts", JSON.stringify(contactList));
	}, [contactList])

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
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <AddIcon onClick={() => setOpenCreateContactDialog(true)} />
          </div>
          <section>
            <SectionHeader>Favorites</SectionHeader>
            {favoriteList.map((favContact) => (
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
            {contactList.slice(pageIndex * 10, (pageIndex + 1) * 10).map((contact) => (
              <Contact
                contact={contact}
                key={contact.id}
                onFavorite={favoriteHandler}
                onDelete={deleteHandler}
                refetch={refetch}
              />
            ))}
            <Pagination
              totalPages={data.contact.length / 10}
              onBefore={() => {}}
              onNext={() => {}}
              onClickPage={pageClickHandler}
            />
          </section>
          <CreateEditContactDialog
            open={openCreateContactDialog}
            onClose={() => setOpenCreateContactDialog(false)}
            refetch={refetch}
          />
        </PageContainer>
      )}
    </div>
  );
}

export default App;
