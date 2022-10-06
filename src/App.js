import React, { useContext, useState } from 'react';
import classes from './App.module.css';
import { ImPencil2 } from 'react-icons/im';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Favorites from './components/Favorites';
import { VscSave } from 'react-icons/vsc';
import { todosContext } from './ctx/auth-context';
import { GoTrashcan } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';

function App() {
  const ctx = useContext(todosContext);
  const [showSave, setShowSave] = useState(false);
  const DATA = [
    { id: 1, text: 'Welcome ....', checked: false, favorite: false },
    { id: 2, text: 'Enter - First Todo.....', checked: false, favorite: false },
  ];
  if (!localStorage.length) {
    localStorage.setItem('data', JSON.stringify(DATA));
  }

  const saveHandler = () => {
    localStorage.clear();
    if (ctx.todos.length) {
      localStorage.setItem('data', JSON.stringify(ctx.todos));
      setShowSave(true);
    }
  };

  const closeHandler = () => {
    setShowSave(false);
  };

  const deleteAllHandler = () => {
    localStorage.clear();
    ctx.setTodos([]);
    ctx.setFavorites([]);
  };

  return (
    <div className={classes['todos-container']}>
      <div className={classes['todos-main']}>
        <div className={classes['todos-app']}>
          <header className={classes['todos-app__header']}>
            TODO LIST
            <span className={classes['todos-app__icon']}>
              <ImPencil2 />
            </span>
            <button
              className={`${classes['todos-app__btn']} ${classes['todos-app__save']} `}
              onClick={saveHandler}
            >
              <VscSave />
            </button>
            <button
              className={`${classes['todos-app__btn']} ${classes['todos-app__restart']} `}
              onClick={deleteAllHandler}
            >
              <GoTrashcan />
            </button>
            {showSave && (
              <span className={classes['saved']} onClick={closeHandler}>
                saved successfully !<IoMdClose style={{ color: '#f03e3e' }} />
              </span>
            )}
          </header>
          <AddTodo />
          <TodoList />
        </div>
        <Favorites />
      </div>
    </div>
  );
}

export default App;
