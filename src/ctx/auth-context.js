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
const dataFavorites = data?.filter((todo) => todo.favorite === true);

export const ContextProvider = (props) => {
  const [initialTodos, setInitialTodos] = useState(data || []);
  const [initialFav, setInitialFav] = useState(dataFavorites || []);
  const [initialChecked, setInitialChecked] = useState([]);

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
