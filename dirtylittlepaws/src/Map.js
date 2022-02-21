import React from "react";
import ReactDOM from "react-dom";
import { MapLayout, BottomNav, ScanBottomNavTxt, ScanButtonBottomNav, AccountIcon, HelpIcon } from "./styles/mapstyles";
import scanSVG from "../src/styles/svgs/scan.svg"
import accSVG from "../src/styles/svgs/account.svg"
import helpSVG from "../src/styles/svgs/help.svg"



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
      zoomLevel:14
    };
  }

  FavoritePosition(){

    const map = this.map;
    const current = this.state.currentLocation;
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

  ChangeZoom(){

    const map = this.map;
    const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    
   
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

      let { zoom } = this.props;
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
      <button
        type="button"
        className="btn"
        onClick={() =>
        this.ChangeZoom()
      }
      > 
       { window.innerWidth > 600 ? "Find more locations?" : "More"}
      </button>

      <button
        type="button"
        className="btn"
        onClick={() =>
        this.FavoritePosition()
      }
      > 
       { window.innerWidth > 600 ? "Check home location" : "Home"}
      </button>
      
      <MapLayout>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </MapLayout>
      <BottomNav>
        <AccountIcon><img src={accSVG} /></AccountIcon>
        <ScanButtonBottomNav>
          <img src={scanSVG} />
          <ScanBottomNavTxt>SCAN</ScanBottomNavTxt>
        </ScanButtonBottomNav>
        <HelpIcon><img src={helpSVG} /></HelpIcon>
      </BottomNav>
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
