import React, { Component } from 'react';
//import logo from './logo.svg';
import '../assets/css/App.css'
//import {Map} from 'Immutable';
import {Image} from 'cloudinary-react';
import LazyLoad from 'react-lazy-load';

let dataMap = [];
let locationvalue = [];
let propertyvalue = [];


class Searchbar extends Component {


  constructor(props) {
    super(props);

    this.state = {
      dataMap: [],
      locationvalue: '',
      propertyvalue: ''
    }

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };


  /*callApi(){ 
     fetch('http://192.168.1.207:3000/getAllProperties')
    .then((result) => {
       return result.json();
    }).then((responseJson) => {
      // Do something with the result
      console.log(responseJson);
     /* data = responseJson.developer;
      this.setState({dataMap: data});
      console.log(data)
      this.setState({dataMap: responseJson});
     
 
      
    })
  }*/

  componentDidMount(){
    fetch('http://192.168.1.234:3001/filterProperties')
    
          .then((result) => {
            return result.json();
          }).then((responseJson) => {
            // Do something with the result
            console.log(responseJson);
            this.setState({ dataMap: responseJson });
            console.log(dataMap);
    
          })
      }
  


  handleLocationChange(event) {
    this.setState({ locationvalue: event.target.value });
    console.log(locationvalue)

  }

  handlePropertyChange(event) {
    this.setState({ propertyvalue: event.target.value });
    console.log(propertyvalue)
  }

  handleSubmit(event) {
    if(!this.state.locationvalue && !this.state.propertyvalue){
     
    }
    else{
    fetch('http://192.168.1.234:3001/filterProperties?location=' + this.state.locationvalue + '&propertyType=' + this.state.propertyvalue)
    
          .then((result) => {
            return result.json();
          }).then((responseJson) => {
            // Do something with the result
            console.log(responseJson);
            this.setState({ dataMap: responseJson });
            console.log(dataMap);
    
          })
        event.preventDefault();
      }
    }
  render() {
    return (

      <div className="container">
        <div className="searchformcontainer">
        <h4>Search Property</h4>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>
                Location:
                <input type="text" placeholder="Location.." className="form-control" value={this.state.locationvalue} onChange={this.handleLocationChange} />
              </label>
            </div>
            <div className="form-group">
              <label>
                Bedrooms:
                  <select value={this.state.propertyvalue} onChange={this.handlePropertyChange} className="form-control">
                  <option value="">select</option>
                  <option value="3BHK">3BHK</option>
                  <option value="4BHK">4BHK</option>
                </select>
              </label>
            </div>
            <input type="submit" value="Submit" className="btn btn-success" />
          </form>
        </div>
        
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th><th>Company</th><th>Property Type</th><th>Location</th>
              </tr>
            </thead>
            <tbody>
            { 
              this.state.dataMap.map((item, i) => (
                  <tr>
                   <td><div>
                    <LazyLoad  height={200} offsetVertical={0} >
                    <Image cloudName="ddpnorggf" publicId={item.publicId} width="200" height="100" crop="scale"/></LazyLoad></div>     
                    </td><td>{item.developer}</td><td>{item.propertyType}</td><td>{item.location}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );

  }
}

export default Searchbar;
