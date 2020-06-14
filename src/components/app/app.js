import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import DummySwapiService from '../../services/dummy-swapi-service';
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from '../swapi-service-context';
import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages';

import './app.css';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService()
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

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange}/>

            { planet }

            <PeoplePage/>

            <PlanetsPage/>
            
            <StarshipsPage/>

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
