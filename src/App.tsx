import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_LIST, GET_PHONE_LIST } from "./services/list";
import SectionHeader from "./components/SectionHeader";
import PageContainer from "./components/PageContainer";
import Contact from "./components/Contact";

function App() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);

  console.log(data?.contact);
  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error ? (
        <p>Error!</p>
      ) : (
        <PageContainer>
          <SectionHeader>Favorites</SectionHeader>
					{data?.contact.map((contact) => (
						<Contact contact={contact} key={contact.id} />
					))}
          <SectionHeader>Contact List</SectionHeader>
        </PageContainer>
      )}
    </div>
  );
}

export default App;
