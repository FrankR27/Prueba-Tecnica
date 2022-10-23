import { useState, useEffect, useRef } from "react";
import { getPeople, getCharacter, searchCharacter } from "./api/people";
import "./App.css";

function App() {
  const inputSearch = useRef(null);
  const [textSearch, setTextSearch] = useState("");
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(1);
  const [page, setPage] = useState(1);
  const [details, setDetails] = useState({});

  useEffect(() => {
    getPeople(page)
      .then(setPeople)
      .catch((e) => console.log(e.message));
    return () => {};
  }, [page]);

  useEffect(() => {
    getCharacter(currentCharacter)
      .then(setDetails)
      .catch((e) => console.log(e.message));
    return () => {};
  }, [currentCharacter]);

  const showDetails = (character) => {
    const id = Number(character.url.split("/").at(-2));
    setCurrentCharacter(id);
  };

  const onChangeTextSearch = (e) => {
    const text = inputSearch.current.value;
    setTextSearch(text);
  };

  const onSearchSubmit = (e) => {
    if (e.key !== "Enter") return;
    inputSearch.current.value = "";
    setDetails({});
    searchCharacter(textSearch)
      .then(setPeople)
      .catch((e) => console.log(e.message));
  };

  const onChangePage = (next) => {
    if (!people.previous && page + next <= 0) return;
    if (!people.next && page + next >= 9) return;

    setPage(page + next);
  };

  return (
    <div className="App">
      <h1>Star Wars People</h1>
      <input
        type="text"
        placeholder="Busca un personaje..."
        ref={inputSearch}
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
      />
      {people?.results?.map((people, index) => {
        return (
          // Mala práctica lo mejor sería un id que sea único, pero lo hice así de prueba.
          <ul key={index}>
            <li className="item" onClick={() => showDetails(people)}>
              {people.name}
            </li>
          </ul>
        );
      })}

      <section>
        <button onClick={() => onChangePage(-1)}>Prev</button>| {page} |
        <button onClick={() => onChangePage(1)}>Next</button>
      </section>

      {details && (
        <>
          <h1>Details</h1>
          <aside>
            <h2>{details.name}</h2>
            <p>Height: {details.height}</p>
            <p>Mass: {details.mass}</p>
            <p>Hair Color: {details.hair_color}</p>
          </aside>
        </>
      )}
    </div>
  );
}

export default App;
