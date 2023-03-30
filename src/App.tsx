import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from '@apollo/client'
import { GET_CONTACT_LIST } from "./services/queries";

function App() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);

  return (
    <div className="App">
      { loading && <p>Loading...</p>}
			{ error && <p>Error!</p>}
    </div>
  )
}

export default App
