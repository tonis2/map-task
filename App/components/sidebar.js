import React from "react";
import { connect } from "react-redux";
import { RemovePoint, Download } from "../actions";

class Sidebar extends React.Component {

  deleteItem(id) {
    this.props.dispatch(RemovePoint(id))
  }

  downloadRoute() {
    const route = JSON.stringify(this.props.waypoints)
    console.log(route)
    const data =
      "data:application/javascript;charset=utf-8," + encodeURIComponent(route);
  
    const link = document.createElement("a");
    link.href = data;
    link.target = "_blank";
    link.style.display = "none";
    link.download = "Tracks.gpx"
  
    document.body.appendChild(link);
    link.click();
  
    link.remove();
  }

  render() {
    return (
      <div id="sidebar">
        <h2 id="sidebar-title">Route builder</h2>
        {this.props.waypoints.length === 0 && <div><span className="item-name">Click on map to add waypoint</span></div>}
        <section id="items-container">
          {this.props.waypoints.map((waypoint, index) => {
            return (
              <div key={waypoint.id} className="sidebar-item">
                <img
                  src="/icons/menu.svg"
                  alt="menu-item"
                />
                <span className="item-name">Waypoint {index}</span>
                <img
                  src="/icons/delete.svg"
                  alt="remove"
                  title="remove waypoint"
                  className="remove-item"
                  onClick={this.deleteItem.bind(this, waypoint.id)}
                />
              </div>
            );
          })}
        </section>
        <div id="save-data" onClick={this.downloadRoute.bind(this)}>
          <span>Download your Route</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    waypoints: state
  };
};

export default connect(mapStateToProps)(Sidebar);
