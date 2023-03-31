import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from '@apollo/client'
import { GET_CONTACT_LIST, GET_PHONE_LIST } from "./services/list";

function App() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);

	console.log(data?.contact.map((contact1) => contact1.phones))
  return (
    <div className="App">
      { loading && <p>Loading...</p>}
			{ error && <p>Error!</p>}
    </div>
  )
}

export default App
