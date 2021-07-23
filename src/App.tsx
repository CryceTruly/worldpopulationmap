/* eslint-disable react/jsx-props-no-spreading */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
} from "react-router-dom";
import { GlobalProvider } from "context/Provider";

import routes from "router/routes";

interface RoutesType extends RouteProps {
  routes?: [RouteProps];
}

function RouteWithSubRoutes(route: RoutesType) {
  const { path, component } = route;
  const Component = component as any;

  return (
    <Route
      path={path}
      render={(props) => <Component {...props} routes={route.routes} />}
    />
  );
}

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          {routes.map((route: RouteProps) => (
            <RouteWithSubRoutes {...route} />
          ))}
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
