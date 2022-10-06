import React, { useContext } from 'react';
import { todosContext } from './../ctx/auth-context';
import classes from './TodoList.module.css';
import TodoItem from './TodoItem';
import { ImPencil } from 'react-icons/im';

const TodoList = () => {
  const ctx = useContext(todosContext);
  return (
    <div className={classes['todos-container']}>
      {!ctx.todos.length && (
        <h2 className={classes['no-todos']}>
          Add Todos
          <span>
            <ImPencil />
          </span>
        </h2>
      )}
      <div className={classes['todos-app__list']}>
        <ul className={classes['todos-list']}>
          {ctx.todos.map((el) => (
            <TodoItem data={el} key={el.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
