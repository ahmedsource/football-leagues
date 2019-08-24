import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.scss';

import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';

import HomePage from './containers/HomePage';
import LeaguesPage from './containers/LeaguesPage';
import LeagueDetailsPage from './containers/LeagueDetailsPage';
import TeamDetailsPage from './containers/TeamDetailsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <MainHeader/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/leagues' component={LeaguesPage} />
          <Route exact path='/leagues/:league_id' component={LeagueDetailsPage} />
          <Route exact path='/leagues/:league_id/teams' component={LeagueDetailsPage} />
          <Route exact path='/leagues/:league_id/teams/:team_id' component={TeamDetailsPage} />
        </Switch>
        <MainFooter/>
      </div>
    </Router>
  );
}

export default App;
