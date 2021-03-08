import Page1Menu from "components/Page1Menu";
import {Route, Switch} from "react-router-dom";
import loadable from "@loadable/component";
import Loader from "components/Loader";
import ImportResource from "lib/utils/ImportResource";

const TodosContainer = loadable(
    () => import('containers/TodosContainer'),
    {fallback: <Loader />});

const Counter = loadable(
    () => import('components/Counter'),
    {fallback: <Loader />});

const NotFound = loadable(
    () => import('components/NotFound'),
    {fallback: <Loader />});

const FirstPage = () => {

  ImportResource('script', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js');
  ImportResource('css', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.min.css');

  window.onload=()=>{
    console.log(window.jQuery);
  }

  return (
      <div>
        <Page1Menu />
        <hr/>
        <Switch>
          <Route path={["/", "/page1", "/page1/counter"]} component={Counter} exact={true}/>
          <Route path="/page1/todos" component={TodosContainer} />
          <Route
              render = {
                ({location}) => (
                    <NotFound pathname={location.pathname} />
                )
              }
          />
        </Switch>
      </div>
  );
}

export default FirstPage;