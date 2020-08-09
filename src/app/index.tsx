/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { Container } from 'reactstrap';

import { HomePage } from './containers/HomePage/Loadable';
import { BecomeAgent } from './containers/BecomeAgent/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

import { Header } from './components/Header/index';
import ProtectedRoute from './routes/ProtectedRoute';

import { AgentLogin } from './containers/AgentLogin';
import { AgentDashboard } from './containers/AgentDashboard';
import { VerifyAgent } from './containers/VerifyAgent';
import { SignIn } from './containers/SignIn';
import { AgentChangePassword } from './containers/AgentChangePassword/Loadable';
import { AgentProfile } from './containers/AgentProfile/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Xurpresa" defaultTitle="Xurpresa">
        <meta name="description" content="Home of Surprises" />
      </Helmet>

      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/become-agent" component={BecomeAgent} />
          <Route path="/agent-login" component={AgentLogin} />
          <Route path="/verify" component={VerifyAgent} />
          <Route path="/signin" component={SignIn} />

          <ProtectedRoute path="/agent-dashboard" component={AgentDashboard} />
          <ProtectedRoute path="/agent-profile" component={AgentProfile} />
          <ProtectedRoute
            path="/agent-password"
            component={AgentChangePassword}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
      <GlobalStyle />
    </BrowserRouter>
  );
}
