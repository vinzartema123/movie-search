import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '../routes/helpers';
import ProtectedRoutes from '../routes/ProtectedRoutes';

const Home = lazy(() => import('../pages/Home'));


export function AppRoutes({ isAuthenticated }) {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PublicRoute path="/" isAuthenticated={isAuthenticated} exact>
            <Home />
          </PublicRoute>
        {/*  <PublicRoute path="/login" isAuthenticated={isAuthenticated} exact>
            <Login />
          </PublicRoute>
          <PublicRoute path="/register" isAuthenticated={isAuthenticated} exact>
            <Registration />
          </PublicRoute>
          <PrivateRoute path="/" isAuthenticated={isAuthenticated} >
            <ProtectedRoutes />
          </PrivateRoute>*/}
        </Switch>
      </Suspense>
    </Router>
  );
}
