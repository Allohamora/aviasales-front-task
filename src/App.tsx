import React, { useState, useEffect } from 'react';
import { aviaSales } from 'services/aviasales';
import { Tickets } from 'containers/Tickets';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type SearchId = string | null;

export const App = () => {
  const [searchId, setSearchId] = useState<SearchId>(null);

  useEffect( () => {
    (async() => {
      setSearchId(await aviaSales.getSearchId());
    })()
  }, [] )

  return (
    <div>
      <ToastContainer />
      searchId: {searchId}

      <Tickets searchId={searchId} />
    </div>
  )
}