import {Link} from "react-router-dom";
import loadable from "@loadable/component";
import Loader from "components/Loader";

const Counter = loadable(
    () => import('components/Counter'),
    {fallback: <Loader />});

const onMouseOver = () => {
  Counter.preload();
}

const Page1Menu = () => {
  return (
      <div>
        <ul>
          <li onMouseOver={onMouseOver}>
            <Link to="/page1/counter">카운터</Link>
          </li>
          <li>
            <Link to="/page1/todos">할일들</Link>
          </li>
        </ul>
      </div>
  );
}

export default Page1Menu;