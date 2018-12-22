import React from "react";
import { AddPoint } from "../actions";
import { connect } from "react-redux";

const createIcon = index =>
  L.divIcon({
    className: "map-marker",
    iconSize: null,
    html: `<div class="marker"><span>${index}</span></div>`
  });

class Map extends React.Component {
  constructor(props) {
    super();
  }

  componentDidUpdate() {
    const markers = this.props.waypoints.map(
      pos => new L.LatLng(pos.lat, pos.lng)
    );
    this.props.waypoints.forEach((location, index) => {
      L.marker(location, { icon: createIcon(index) }).addTo(this.map);
    });
    L.polyline([...markers], {
      smoothFactor: 2.0,
      weight: 8,
      color: "var(--blue)"
    }).addTo(this.map);
  }

  componentDidMount() {
    const layer = new L.StamenTileLayer("terrain");
    const map = new L.Map("map-container", {
      center: new L.LatLng(52.4283408, 12.9572014, 12),
      zoom: 12
    });
    map.addLayer(layer);

    map.on("click", event => {
      const coord = event.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
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
