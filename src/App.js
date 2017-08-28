//#!/usr/bin/env node
import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer'
import InterfacePanel from './components/InterfacePanel'

var amqp = require('amqp');

/**
 *  Unité d'incrémentation du cercle rouge autour de l'utilisateur
 */
const RADIUS_UNIT = 50

/**
 * Liste des marqueurs static
 */
const MARKER_SAMPLE=[
    {
    "latitude": 48.904841,
    "longitude": 2.38773
    },
    {
    "latitude": 48.910767,
    "longitude": 2.347984
    },
    {
    "latitude": 48.903095,
    "longitude": 2.32893
    },
    {
    "latitude": 48.901346,
    "longitude": 2.326097
    },
    {
    "latitude": 48.882074,
    "longitude": 2.311978
    },
    {
     "latitude": 48.903264,
     "longitude": 2.377424
    }
]

class App extends Component {
    constructor(props) {
      super(props);

      this.isUnmounted = false;

      this.state = {
          radius: 100
      };
    }

    /**
     * Fonction de connection à AMQP
     * todo fix error: Type_check net.connect(...) is not a function
     */
    connectAMQP(){
        var connection = amqp.createConnection({ host: URL_AMQP });

        connection.on('error', function(e) {
          console.log("Error from amqp: ", e);
        });

        connection.on('ready', function () {
          connection.queue('my-queue', function (q) {
              q.bind('drivers');

              q.subscribe(function (message) {
                console.log(message);
              });
          });
        });
    }

    componentWillMount(){
        //this.connectAMQP()
    }

    /**
     * addRadius et removeRadius change le rayon du cercle rouge autour de l'utilisateur
     */
    addRadius(){
        var radiusTmp =  this.state.radius + RADIUS_UNIT

        this.setState({
            radius: radiusTmp
        })
    }
    removeRadius(){
        var radiusTmp =  this.state.radius - RADIUS_UNIT
        if (radiusTmp >= RADIUS_UNIT){
            this.setState({
                radius: radiusTmp
            })
        }
    }

  render() {
    return (
      <div className="App">
          <InterfacePanel
              markers={MARKER_SAMPLE}
              radius= {this.state.radius}
              addRadius={() => this.addRadius()}
              removeRadius={() => this.removeRadius()}
              />
          <MapContainer
              radius= {this.state.radius}
              markers={MARKER_SAMPLE}
              />
      </div>
    );
  }
}

export default App;
