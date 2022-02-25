import React from "react";
import ReactDOM from "react-dom";
import {
  HomeIcon,
  MapLayout,
} from "./styles/mapstyles";
import locationSVG from "../src/styles/svgs/CenterLocation.svg";
import homeSVG from "../src/styles/svgs/home.svg";

const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
};

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
      zoomLevel: 14,
    };
  }

  FavoritePosition() {
    const map = this.map;
    // const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    const pos = {
      lat: 41.879463,
      lng: -87.628461,
    };

    let center = new maps.LatLng(pos.lat, pos.lng);
    map.panTo(center);

    //this.props.google.maps.setCenter(pos);
  }

  ChangeZoom() {
    // const map = this.map;
    // const current = this.state.currentLocation;
    // const google = this.props.google;
    // const maps = google.maps;

    this.setState({
      zoomLevel: 13,
    });

    this.loadMap();

    //this.props.google.maps.setCenter(pos);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        });
      }
    }
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      // let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: this.state.zoomLevel,
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, (c) => {
      if (!c) return;

      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);

    return (
      <>
      <HomeIcon>
        
        <img src = {locationSVG} type="button" onClick={() => this.ChangeZoom()}/>
        <img src = {homeSVG} type="button" onClick={() => this.FavoritePosition()}/>
      </HomeIcon>
        <MapLayout>
          <div style={style} ref="map">
            Loading map...
          </div>
          {this.renderChildren()}
        </MapLayout>
      </>
    );
  }
}

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 41.91807726393084,
    lng: -87.65872153719155,
  },
  centerAroundCurrentLocation: false,
  visible: true,
};

export default CurrentLocation;
