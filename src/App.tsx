import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_LIST, GET_PHONE_LIST } from "./services/list";
import SectionHeader from "./components/SectionHeader";
import PageContainer from "./components/PageContainer";
import Contact from "./components/Contact";
import Autocomplete from "./components/Autocomplete";
import { ReactComponent as AddIcon } from "./assets/add_icon.svg";
import Pagination from "./components/Pagination";

function App() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);
  const [autocompleteInputValue, setAutocompleteInputValue] = useState("");

  console.log(data?.contact);
  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error ? (
        <p>Error!</p>
      ) : (
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
          </section>
          <section>
            <SectionHeader>Contact List</SectionHeader>
            {data?.contact.map((contact) => (
              <Contact contact={contact} key={contact.id} />
            ))}
						<Pagination />
          </section>
        </PageContainer>
      )}
    </div>
  );
}

export default App;
