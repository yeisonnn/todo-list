import React, { useContext, useState, useEffect } from 'react';
import classes from './Favorites.module.css';
import { todosContext } from './../ctx/auth-context';
import FavCheckList from './FavCheckList';

const Favorites = () => {
  const ctx = useContext(todosContext);
  const [todos, setTodos] = useState([]);
  const [todosCheck, setTodosCheck] = useState([]);
  const [showFavorites, setShowFavorites] = useState(true);
  const [header, setHeader] = useState('Favorites');

  const favoritesHandler = () => {
    const newList = ctx.todos.filter((todo) => todo.favorite === true);
    setTodos(newList);
    setHeader('Favorites');
    setShowFavorites(true);
  };

  const checkedHandler = () => {
    const newList = ctx.todos.filter((todo) => todo.checked === true);
    setTodosCheck(newList);
    setHeader('Completed');
    setShowFavorites(false);
  };

  useEffect(() => {
    setTodos(ctx.favorites);
  }, [ctx.favorites]);

  useEffect(() => {
    setTodosCheck(ctx.checked);
  }, [ctx.checked]);

  return (
    <div className={classes.favorites}>
      <header className={classes['favorites__header']}>
        <button onClick={favoritesHandler}>Favorites</button>
        <button onClick={checkedHandler}>Completed</button>
      </header>
      <section className={classes['favorites__content']}>
        <div className={classes['favorites__container']}>
          <div className={classes['favorites__text-box']}>
            <h1>{header}</h1>
            <h1>{header}</h1>
          </div>
          {!todos.length && showFavorites && (
            <h2 className={classes['no-favorites']}>No-{header}</h2>
          )}
          {showFavorites ? (
            <FavCheckList data={todos} />
          ) : (
            <FavCheckList data={todosCheck} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;
