
import {
  default as React,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

import MarkerClusterer from "../dlc/MarkerClusterer.js";

import myMapStyles from "../constants/myMapStyles.json";


export const  MapView = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultOptions={{ styles: myMapStyles }}
    center={props.center}
  >
  {props.directions && <DirectionsRenderer directions={props.directions} />}

      {props.markers && <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
        {
        props.markers.map(marker => (
          <Marker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            key={marker.photo_id}
            onClick={() => props.onMarkerClick(marker.latitude, marker.longitude)}
          />
        ))
    }
    </MarkerClusterer>}
    {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}
  </GoogleMap>
));
