import { createContext, useState } from 'react';

export const todosContext = createContext({
  todos: [],
  setTodos: () => {},
  favorites: [],
  setFavorites: () => {},
  checked: [],
  setChecked: () => {},
});

const data = JSON.parse(localStorage.getItem('data'));

export const ContextProvider = (props) => {
  const [initialTodos, setInitialTodos] = useState(data);
  const [initialFav, setInitialFav] = useState([]);
  const [initialChecked, setInitialChecked] = useState([]);

  if (data.length) {
    const dataFavorites = data.filter((todo) => todo.favorite === true);
    setInitialFav(dataFavorites);
  }

  return (
    <todosContext.Provider
      value={{
        todos: initialTodos,
        setTodos: setInitialTodos,
        favorites: initialFav,
        setFavorites: setInitialFav,
        checked: initialChecked,
        setChecked: setInitialChecked,
      }}
    >
      {props.children}
    </todosContext.Provider>
  );
};
