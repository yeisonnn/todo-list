import React, { useContext, useState } from 'react';
import { ImPlus } from 'react-icons/im';
import classes from './AddTodo.module.css';
import { nanoid } from 'nanoid';
import { todosContext } from './../ctx/auth-context';

const AddTodo = () => {
  const ctx = useContext(todosContext);
  const [inputText, setinputText] = useState('');

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!inputText) return;
    ctx.setTodos([
      ...ctx.todos,
      { id: nanoid(), text: inputText, checked: false, favorite: false },
    ]);
    setinputText('');
  };
  return (
    <form className={classes['todos-app__input']} onSubmit={addTodoHandler}>
      <input
        type="text"
        placeholder="things you want to do !!!"
        value={inputText}
        onChange={(e) => setinputText(e.target.value)}
      />
      <button type="submit">
        <ImPlus />
      </button>
    </form>
  );
};

export default AddTodo;
