import React from 'react';
import {TopNav, PrivateRoute} from 'Components';
import {Link, Switch, Route} from 'react-router-dom';
import ScoreboardAllPage from './components/ScoreboardAll/ScoreboardAllPage';

import './scoreboard-page.scss';

export class ScoreboardPage extends React.Component {
  render() {
    return (
      <div className="fill">
        <TopNav title="Scoreboard"/>
        <div className="fill scoreboard-page">
          <Link to="/scores/all">All</Link>
          <Link to="/scores/organization">Organization</Link>
          <Switch>
            <Route path="/scores/organization" exact component={ScoreboardAllPage} />
            <Route path="/scores/all" exact component={ScoreboardAllPage} />
            <PrivateRoute path="/scores" redirectTo="/scores/all" authenticated={false} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default ScoreboardPage;
