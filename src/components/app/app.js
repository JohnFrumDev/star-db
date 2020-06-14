import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import DummySwapiService from '../../services/dummy-swapi-service';
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from '../swapi-service-context';
import {
  PeoplePage, 
  PlanetsPage, 
  StarshipsPage,
  LoginPage,
  SecretPage} from '../pages';

import './app.css';

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import StarshipDetails from '../starship-details';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ?
                      DummySwapiService : SwapiService;
      console.log('Service changed to ' + Service.name);

      return {
        swapiService: new Service()
      };
    });
  }

  render() {

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet updateInterval={2000}/> :
      null;

    const { isLoggedIn} = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>

              { planet }

              <Switch>
                <Route path="/" 
                      render={() => <h2>Welcome to StarDB</h2>} 
                      exact />
                <Route path="/people/:id?" component = {PeoplePage} />
                <Route path="/people" 
                      render={() => <h2>People</h2>} 
                      exact />
                <Route path="/planets" component = {PlanetsPage} />
                <Route path="/starships" exact component = {StarshipsPage} />
                <Route path="/starships/:id" 
                    render={({match}) => {
                      const { id } = match.params;
                      return <StarshipDetails itemId={id} />
                    }} />
                <Route 
                  path="/login" 
                  render={() => (
                    <LoginPage 
                      isLoggedIn={isLoggedIn}
                      onLogin={this.onLogin}/>
                  )}/>
                <Route 
                  path="/secret" 
                  render={() => (
                    <SecretPage 
                      isLoggedIn={isLoggedIn}/>
                )}/>
                <Route render={() => <h2>Page not Found</h2>}/>
              </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
