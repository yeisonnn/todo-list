import classes from './Favorites.module.css';
import { nanoid } from 'nanoid';

const FavCheckList = ({ data }) => {
  return (
    <div>
      <ul className={classes['favorites-list']}>
        {data.map((todo, idx) => (
          <li className={classes['favorites-item']} key={nanoid()}>
            <span>{idx + 1}</span>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavCheckList;
