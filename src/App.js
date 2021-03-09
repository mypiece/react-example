import {Route, Switch} from "react-router-dom";
import loadable from "@loadable/component";
import Loader from 'components/Loader';

const FirstPage = loadable(
    () => import('pages/FirstPage'),
    {fallback: <Loader />});

const SecondPage = loadable(
    () => import('pages/SecondPage'),
    {fallback: <Loader />});

const NotFound = loadable(
    () => import('components/NotFound'),
    {fallback: <Loader />});

const App = () => {

  return (
      <Switch>
        <Route path={["/", "/page1", "/page1/:menu"]} component={FirstPage} exact={true}/>
        <Route path={["/page2", "/page2"]} component={SecondPage}/>
        <Route
            render = {
              ({location}) => (
                  <NotFound pathname={location.pathname} />
              )
            }
        />
      </Switch>
  );
}

export default App;
