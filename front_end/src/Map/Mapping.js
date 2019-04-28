import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {render} from 'react-dom';
import MapGL, {Marker, Popup, NavigationControl, FullscreenControl} from 'react-map-gl';
import CityPin from './City-pin';
import PieChart from './PieChart';
import ControlPanel from './Panel'
import { throwStatement } from '@babel/types';
const MAPBOX_TOKEN = 'pk.eyJ1Ijoidmliczk3IiwiYSI6ImNqdXY5dTJ4ODAzMmk0NHJ2dWI1bTd6NGYifQ.sOrrTPkz4Z2ovBsrocX_6w'; // Set your mapbox token here

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

var travel_type = {
  color: '#FF5733',
  label: 'Travel Options',
  radius: '50%',
  values: [{name: 'Long Dist.', value: 10}, {name: 'Point-Point', value: 4}, {name: 'Hourly rental', value: 3}]
};

var sort = null;
var data_medium = {
  color: '#FFC300',
  label: 'Mode Of Booking',
  radius: ['55%', '70%'],
  values: [{value: 'Mobile', n: 10}, {x: 'Online', y: 4}, {x: 'None', y: 3}]
};
class Mapping extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth*3/4,
        height: window.innerHeight,
        latitude:this.props.location.state.coord[1].from_lat,
        longitude:this.props.location.state.coord[1].from_long,
        zoom: 8,
        bearing: 0,
        pitch: 0,
        
      },
      colo: ['#FF5733', '#DAF7A6', '#C70039', '#581845'],
      map: null,
      distance: null,
      time: null
    }
  }

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }
  convertToTime = (timestamp) => {
    let d = new Date(timestamp);
    return d.toString();
  }
  componentDidMount(){
    this.setState({
      map: this.reactMap.getMap()
    })
    console.log(this.props.location.state);
    var a = 0
    var b=0
    var c=0
    var d = 0
    var e = 0
    var f = 0
    for(var i =0; i<this.props.location.state.coord.length;i++){
      if(this.props.location.state.coord[i].mobile_site_booking===1){
        a+=4;
      }
      else if(this.props.location.state.coord[i].online_booking===1){
        b+=4;
      }
      else{
        c+=4;
      }
    }

    for(var i =0; i<this.props.location.state.coord.length;i++){
      if(this.props.location.state.coord[i].travel_type_id===1){
        d+=4;
      }
      else if(this.props.location.state.coord[i].travel_type_id===2){
        e+=4;
      }
      else{
        f+=4;
      }
    }

    data_medium['values']=[]
    data_medium['values'].push({name: 'Mobile', value: a})
    data_medium['values'].push({name: 'Web', value: b})
    data_medium['values'].push({name: 'None', value: c})

    travel_type['values']=[]
    travel_type['values'].push({name: 'Long', value: d})
    travel_type['values'].push({name: 'P2P', value: e})
    travel_type['values'].push({name: 'Package', value: f})
    
  }
  // couldn't use this function because routes are not available for indian coordinates
  getRoute(start, end) {
    // make a directions request using cycling profile
    var proxy_url = 'https://cors-anywhere.herokuapp.com/';
    var url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+start[0]+','+start[1]+'&destination='+end[0]+','+end[1]+'&key=AIzaSyC1jcDnPA3yhfjLTl9K-OrpOXhFqMS-i9Q'

    fetch(`${proxy_url}${url}`)
    .then(response => response.json())
    .then(data => this.setState({distance: data['routes'][0]['legs'][0]['distance']['text'], time: data['routes'][0]['legs'][0]['duration']['text']}));
      
      // Getting routes using MapBoxAPI
      // if (this.state.map.getSource('route')) {
      //   this.state.map.getSource('route').setData(geojson);
      // } else { // otherwise, make a new request
      //   this.state.map.addLayer({
      //     id: 'route',
      //     type: 'line',
      //     source: {
      //       type: 'geojson',
      //       data: {
      //         type: 'Feature',
      //         properties: {},
      //         geometry: {
      //           type: 'LineString',
      //           coordinates: geojson
      //         }
      //       }
      //     },
      //     layout: {
      //       'line-join': 'round',
      //       'line-cap': 'round'
      //     },
      //     paint: {
      //       'line-color': '#3887be',
      //       'line-width': 5,
      //       'line-opacity': 0.75
      //     }
      //   });
      // }
      // add turn instructions here at the end
  }
  displayInfo = (city) => {
    let dat = this.convertToTime(city.from_date)
    document.getElementById('no').style.display='none';
    document.getElementById('lat').innerHTML='Latitude: '+city.from_lat
    document.getElementById('lon').innerHTML='Longitude: '+city.from_long
    document.getElementById('date').innerHTML='Starting Time: '+ dat
    document.getElementById('yes').style.display='block';
    this.getRoute([city.from_lat, city.from_long], [city.to_lat, city.to_long])
  }
  getColor(){
    let number = Math.floor(Math.random()*4)
    return this.state.colo[number]
  }
  _renderCityMarker = (city, index) => {
    if(city.from_long==="NULL"||city.to_long==="NULL"||city.to_lat==="NULL"){

    }
    else{
      return (
        <div>
        <Marker 
          key={`marker-${index}`}
          longitude={city.from_long}
          latitude={city.from_lat} >
          <CityPin size={20} color={'#d00'} onClick={()=> this.displayInfo(city)} />
        </Marker>
        <Marker 
          key={`marker-to-${index}`}
          type='end'
          i = {index}
          longitude={city.to_long}
          latitude={city.to_lat} >
          <CityPin size={20} color={'#FF5733'}  />
        </Marker>
      </div>
      );
    }

  }


  render() {
    const {viewport} = this.state;
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-3">
          <br />
          <div className="card bg-dark mb-3 text-white" style={{width: '18rem'}}>
            <div className="card-body" id="no" style={{display: 'block'}}>
            <h6 class="card-subtitle mb-2">Select a Point to show its information !!</h6>
            </div>
            <div className="card-body" id="yes" style={{display: 'none'}}>
            <h6 id = "lat" class="card-subtitle mb-2">Latitude: </h6>
            <h6 id="lon" class="card-subtitle mb-2 ">Longitude: </h6>
            <h6 id="date" class="card-subtitle mb-2 ">Date of Booking: </h6>
            <a href="#" class="btn btn-light">Trip Destination</a>
            </div>
          </div>
          <br />
          <div class="card" style={{width: "18rem", marginTop: '-5'}}>
          <br />
          <PieChart data={data_medium}/>
            <div class="card-body" >
            <p className="text-muted">Distribution by Medium Of Booking</p>
            </div>
          </div>
            
            <div class="card" style={{width: "18rem", marginTop: 0}}>
            <PieChart data={travel_type}/>
            <div class="card-body">
            <p className="text-muted">Distribution by Travel type</p>
          </div>            
          </div>
          </div>
          <div className="col-9" style={{overflow:'hidden', overflowY: 'hidden !important'}}>
          <MapGL 
            mapboxApiAccessToken={MAPBOX_TOKEN}
            ref={(reactMap) => this.reactMap = reactMap}
            {...viewport}
            onViewportChange={(viewport) => this.setState({viewport})}>
            {this.props.location.state.coord.map(this._renderCityMarker) }
            <div className="fullscreen" style={fullscreenControlStyle}>
              <FullscreenControl />
            </div>
            <div className="nav" style={navStyle}>
              <NavigationControl onViewportChange={this._updateViewport} />
            </div>
            <ControlPanel containerComponent={this.props.containerComponent} />
          </MapGL>
          </div>
        </div>
      </div>
      
    );
  }
}
export default Mapping;