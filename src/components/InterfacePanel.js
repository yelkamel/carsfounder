import React, { Component } from 'react';
import logo from '../images/wheels.png';
import '../componentstyles/InterfacePanel.css';


export default class InterfacePanel extends Component {
    constructor(props) {
      super(props);

      this.isUnmounted = false;

      this.state = {
      };
    }

    componentDidMount(){
    }

  render() {
    return (
        <div style={{ position: 'absolute',
                      top: 0,
                      left: 0,
                      right: '75%',
                      bottom: 0,
                      backgroundColor: '#146474',
                 }}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Nombre de voiture: {this.props.markers.length}</h2>
          <h2>Rayon de marche: {this.props.radius}</h2>
          <button onClick = {() => this.props.addRadius()}>+</button>
          <button onClick = {() => this.props.removeRadius()}>-</button>



        </div>
    );
  }
}
