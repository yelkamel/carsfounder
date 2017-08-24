//#!/usr/bin/env node

import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer'
import InterfacePanel from './components/InterfacePanel'

import * as amqp from 'amqplib/callback_api';


const RADIUS_UNIT = 50


const URL_AMQP = "amqp://guest:guest@localhost:5672"

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


     onceChannelCreated(err, channel) {
         if (err) {
           console.log(err);
         }
         else {
           console.log('channel created');
          }
      }
    onceConnected (err, conn) {
                console.log("TEST err: " +conn);
      if (err) {
        console.log(err);
      }
      else {
        console.log('connected')
        conn.createChannel(function(err, ch) {
            if (err) {
              console.log(err);
            }
            else {
              console.log('channel created');
             }
             conn.close();
        });

      }
    }

    componentWillMount(){
       //amqp.connect(URL_AMQP, function (err, conn) {
       //    console.info("Test connection: " + JSON.Stringify(conn));
       //    conn.close()
       //});
    }

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
