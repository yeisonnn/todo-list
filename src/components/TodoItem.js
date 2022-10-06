import React, { useState, useContext } from 'react';
import { todosContext } from './../ctx/auth-context';
import classes from './TodoItem.module.css';
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';

const TodoItem = ({ data }) => {
  const ctx = useContext(todosContext);
  const [showEditing, setShowEditing] = useState(false);
  const [inputText, setInputText] = useState(data.text);

  const updateHandler = () => {
    setShowEditing((prevState) => !prevState);
  };

  const deleteHandler = () => {
    const newList = ctx.todos.filter((el) => el.id !== data.id);
    ctx.setTodos(newList);
    const onlyFavorites = newList.filter((todo) => todo.favorite === true);
    ctx.setFavorites(onlyFavorites);
    const onlyChecked = newList.filter((todo) => todo.checked === true);
    ctx.setChecked(onlyChecked);
  };

  const updateTextHandler = () => {
    const newList = ctx.todos.map((todo) => {
      if (todo.id === data.id) {
        return { ...todo, text: inputText };
      }
      return todo;
    });

    ctx.setTodos(newList);
    ctx.setFavorites(newList.filter((todo) => todo.favorite === true));
    ctx.setChecked(newList.filter((todo) => todo.checked === true));
    setShowEditing((prevState) => !prevState);
  };

  const markFavoriteHandler = () => {
    const newList = ctx.todos.map((todo) => {
      if (todo.id === data.id) {
        return { ...todo, favorite: true };
      }
      return todo;
    });

    ctx.setTodos(newList);
    const onlyFavorites = newList.filter((todo) => todo.favorite === true);
    ctx.setFavorites(onlyFavorites);
  };

  const unMarkFavoriteHandler = () => {
    const newList = ctx.todos.map((todo) => {
      if (todo.id === data.id) {
        return { ...todo, favorite: false };
      }
      return todo;
    });

    ctx.setTodos(newList);
    const removedFavorites = newList.filter((todo) => todo.favorite === true);
    ctx.setFavorites(removedFavorites);
  };

  const checkedHandler = () => {
    const newList = ctx.todos.map((todo) => {
      if (todo.id === data.id) {
        return { ...todo, checked: true };
      }
      return todo;
    });

    ctx.setTodos(newList);
    const onlyChecked = newList.filter((todo) => todo.checked === true);
    ctx.setChecked(onlyChecked);
  };

  const unCheckedHandler = () => {
    const newList = ctx.todos.map((todo) => {
      if (todo.id === data.id) {
        return { ...todo, checked: false };
      }
      return todo;
    });

    ctx.setTodos(newList);
    const onlyChecked = newList.filter((todo) => todo.checked === true);
    ctx.setChecked(onlyChecked);
  };

  let textClasses = data.checked ? 'todo-item__text' : '';

  return (
    <li key={data.id} className={classes['todo-item']}>
      <div className={classes['todo-item__checked']}>
        {data.checked ? (
          <span onClick={unCheckedHandler} style={{ color: '#2ecc40' }}>
            <RiCheckboxBlankCircleFill />
          </span>
        ) : (
          <span onClick={checkedHandler}>
            <RiCheckboxBlankCircleLine />
          </span>
        )}
      </div>
      <div className={classes['todo-item__checked']}>
        {data.favorite ? (
          <span style={{ color: '#ff4136' }} onClick={unMarkFavoriteHandler}>
            <MdFavorite />
          </span>
        ) : (
          <span onClick={markFavoriteHandler}>
            <MdFavoriteBorder />
          </span>
        )}
      </div>
      <div>
        {showEditing ? (
          <div className={classes['todo-item__editing']}>
            <input
              type="text"
              className={classes['todo-item__input']}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              className={classes['todo-item__btn']}
              onClick={updateTextHandler}
            >
              <AiOutlineCheck />
            </button>
          </div>
        ) : (
          <div className={classes[`${textClasses}`]}>{data.text}</div>
        )}
      </div>
      <div className={classes['todo-item__edit']}>
        <span onClick={updateHandler}>
          <FiEdit3 />
        </span>
        <span onClick={deleteHandler}>
          <BsTrash />
        </span>
      </div>
    </li>
  );
};

export default TodoItem;
