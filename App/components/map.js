import React from "react";
import { connect } from "react-redux";
import { AddPoint, MovePoint } from "../actions";

const createIcon = index =>
  L.divIcon({
    className: "map-marker",
    iconSize: null,
    html: `<div class="marker"><span>${index}</span></div>`
  });

class Map extends React.Component {
  constructor() {
    super();
    this.markerCluster = L.layerGroup();
  }

  movePointPosition(event) {
    const { lat, lng } = event.target.getLatLng();
    const markerID = event.target.ID;

    console.log(this)
    this.props.dispatch(MovePoint(markerID, lat, lng));
  }

  createMarkers(waypoints) {
    const markers = new Array();

    waypoints.forEach((location, index) => {
      const marker = L.marker(location, {
        icon: createIcon(index),
        draggable: true
      });

      marker.ID = location.id;

      marker.on("dragend",  this.movePointPosition.bind(this));

      markers.push(marker);
    });

    markers.push(
      L.polyline([...waypoints.map(location => [location.lat, location.lng])], {
        smoothFactor: 2.0,
        weight: 8,
        color: "var(--blue)"
      })
    );

    return markers;
  }

  componentDidUpdate() {
    this.markerCluster.clearLayers();
    this.createMarkers(this.props.waypoints).forEach(item =>
      this.markerCluster.addLayer(item)
    );
    this.markerCluster.addTo(this.map);
  }

  componentDidMount() {
    const layer = new L.StamenTileLayer("terrain");
    const map = new L.Map("map-container", {
      center: new L.LatLng(52.4283408, 12.9572014, 12),
      zoom: 12
    });
    map.addLayer(layer);
    map.on("click", event => {
      const { lat, lng } = event.latlng;

      this.props.dispatch(AddPoint(lat, lng));
    });

    this.map = map;
  }
  render() {
    return <div id="map-container" />;
  }
}

const mapStateToProps = state => {
  return {
    waypoints: state
  };
};

export default connect(mapStateToProps)(Map);
