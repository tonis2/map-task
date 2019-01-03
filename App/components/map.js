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
    document.addEventListener("download", this.downloadGPX.bind(this));
  }

  movePointPosition(event) {
    const { lat, lng } = event.target.getLatLng();
    const markerID = event.target.ID;
    this.props.dispatch(MovePoint(markerID, lat, lng));
  }

  downloadGPX() {
    const xmlData = this.props.waypoints.map((entry, index) => {
      return {
        lat: entry.lat,
        lng: entry.lng,
        name: `Waypoint ${index}`
      };
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
                version="1.0"
                creator="Route planner"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns="http://www.topografix.com/GPX/1/0"
                xsi:schemaLocation="http://www.topografix.com/GPX/1/0
                http://www.topografix.com/GPX/1/0/gpx.xsd">
                <gpx version="1.0">
                    <name>My planned route</name>
                    ${xmlData
                      .map(location => {
                        return `<wpt lat="${location.lat}" lon="${
                          location.lng
                        }">
                                <name>${location.name}</name>
                              </wpt>`;
                      })
                      .join("")}
                </gpx>`;
    const data =
      "data:application/text;charset=utf-8," + encodeURIComponent(xml);

    const link = document.createElement("a");
    link.href = data;
    link.target = "_blank";
    link.style.display = "none";
    link.download = "Tracks.gpx";

    document.body.appendChild(link);
    link.click();

    link.remove();
  }

  createMarkers(waypoints) {
    const markers = new Array();

    waypoints.forEach((location, index) => {
      const marker = L.marker(location, {
        icon: createIcon(index),
        draggable: true
      });

      marker.ID = location.id;
      marker.on("dragend", this.movePointPosition.bind(this));
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

  addPointToMap(event) {
    const { lat, lng } = event.latlng;
    this.props.dispatch(AddPoint(lat, lng));
  }

  componentDidMount() {
    const layer = new L.StamenTileLayer("terrain");
    const map = new L.Map("map-container", {
      center: new L.LatLng(52.4283408, 12.9572014, 12),
      zoom: 12
    });
    map.addLayer(layer);
    map.on("click", this.addPointToMap.bind(this));
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
