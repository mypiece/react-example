import {Route, Switch} from "react-router-dom";
import loadable from "@loadable/component";
import Loader from 'components/Loader';

const Page1 = loadable(
    () => import('pages/FirstPage'),
    {fallback: <Loader />});

const Page2 = loadable(
    () => import('pages/SecondPage'),
    {fallback: <Loader />});

const NotFound = loadable(
    () => import('components/NotFound'),
    {fallback: <Loader />});

const App = () => {

  return (
      <Switch>
        <Route path={["/", "/page1", "/page1/:menu"]} component={Page1} exact={true}/>
        <Route path={["/page2", "/page2"]} component={Page2}/>
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
