import React, { useContext, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import Main from "./components/Main/Main";
import ListFilm from "./components/ListFilms/ListFilms";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Context = React.createContext();
function App() {
  const [context, setContext] = useState(new Date());
  return (
    <Context.Provider value={[context, setContext]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/films" element={<ListFilm />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>

    // <>
    //   <Main />
    // </>
  );
}

export default App;
