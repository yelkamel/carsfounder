/* eslint-disable no-undef */
import canUseDOM from "can-use-dom";
import raf from "raf";

import {
  default as React,
  Component,
} from "react";



import {MapView} from './MapView'

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Votre navigateur ne supporte pas la géolocalisation.`);
    },
  })
);


export default class GeolocationExample extends Component {


  constructor(props) {
    super(props);

    this.isUnmounted = false;

    this.state = {
        userPosition: null,
        content: null,
        radius: 200,
        origin: null,
        destination: null,
        directions: null,
    };
  }

  onMarkerClick(lat,lng, userPosition) {
      if (userPosition != null)
       this.getRouteFromUser(lat, lng, userPosition.lat,userPosition.lng)
  }

  /**
   * fonction qui crée le chemin entre l'utilisateur et un marqueur séléctionné
   * @param {position du marqueur et de l'utilisateur}
   */
  getCircleCurrentArea(){
      const tick = () => {
        if (this.isUnmounted) {
          return;
        }
        this.setState({ radius: Math.max(this.state.radius - 20, 0) });

        if (this.state.radius > this.props.radius) {
          raf(tick);
        }
      };
      geolocation.getCurrentPosition((position) => {
        if (this.isUnmounted) {
          return;
        }
        this.setState({
          userPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          content: `Position Actuelle.`,
        });

        raf(tick);
      }, (reason) => {
        if (this.isUnmounted) {
          return;
        }
        this.setState({
          userPosition: {
            lat: 48.902079,
            lng: 2.349014,
          },
          content: `Position par défaut.`,
        });
      });
  }


  /**
   * fonction qui crée le chemin entre l'utilisateur et un marqueur séléctionné
   * @param {position du marqueur et de l'utilisateur}
   */
  getRouteFromUser(markerLat, markerLng, userLat, userLng){
      const DirectionsService = new google.maps.DirectionsService();

   DirectionsService.route({
     origin: new google.maps.LatLng(userLat,userLng),
     destination: new google.maps.LatLng(markerLat,markerLng),
     travelMode: google.maps.TravelMode.WALKING,
   }, (result, status) => {
     if (status === google.maps.DirectionsStatus.OK) {
       this.setState({
         directions: result,
       });
     } else {
       console.error(`error fetching directions ${result}`);
     }
   });
  }

  componentDidMount() {
    this.getCircleCurrentArea()

  }

  componentWillUnmount() {
    this.isUnmounted = true;

  }

  componentWillUpdate(nextProps, nextState){
      if (nextProps.radius !== this.props.radius){
          this.setState({
              radius: nextProps.radius
          })
      }
  }



  render() {
    return (
      <MapView
         markers= {this.props.markers}
        containerElement={
            <div style={{    position: 'absolute',
                          top: 0,
                          left: '25%',
                          right: 0,
                          bottom: 0,
                     }} />
        }
        mapElement={
            <div style={{    position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                     }} />
        }
        center={this.state.userPosition}
        content={this.state.content}
        radius={this.state.radius}
        directions={this.state.directions}
        onMarkerClick={(lat, lng) => this.onMarkerClick(lat, lng, this.state.userPosition)}
      />
    );
  }
}
