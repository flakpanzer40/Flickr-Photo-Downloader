import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor () {
    super();
    this.state = {
      contents: '',
      photos: [],
      selectedOption:'',
      user:'',
      Download: [],
      style:{}
    }
  }

  //Get the user's input in the search box
  getInput (evt) {
    this.setState({
      contents: evt.target.value
    })
  }

  //See which option user picked
  getOption (evt) {
    this.setState({
      
      selectedOption: evt.target.value
    })
  }

  //When user clicks image, add to array of links needed to download, if already in array then take it out
  addToDownload(url){
    var newArray = this.state.Download.slice();    
    if(!this.state.Download.includes(url)){
      
      newArray.push(url);   
      this.setState({Download:newArray})
      
    }
    else{
       
      var index = newArray.indexOf(url)
      newArray.splice(index,1)
      this.setState({Download:newArray})
     
    }

  }

  //Download the pics in the array
  downloadPhotos(){
    //cross origin issues with Chrome :(
      var fileDownload = require('js-file-download');
    this.state.Download.map((link)=>{
      return fileDownload(link, link);
    })


  
  


}

  //Get the photos from the api call and display them
  getPhotos(){
    const contents = this.state.contents
    
    if(this.state.selectedOption === "photos"){
      axios.post('/photos', {
        data: {contents: contents}
      })
          .then(response => {
            this.setState({
              photos: response.data
            })
          })
    }
    else{
         
          if(this.state.selectedOption === "user uploads"){
            axios.post('/uploads', {
              data: {contents:contents}
            })
                .then(response => {
                  this.setState({
                    photos: response.data
                  })
                })
          } 
          else if(this.state.selectedOption === "user favourites"){
            axios.post('/favourites', {
              data: {contents:contents}
            })
                .then(response => {
                  this.setState({
                    photos: response.data
                  })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                })
          } 
    }
  }

  render() {
    const photos = this.state.photos
    

    let images = photos.map((photo, i) => {
      //const url = `http://www.flickr.com/photos/${photo.owner}/${photo.id}`
      const url = `http://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`
      //return <a href ={`http://www.flickr.com/photos/${photo.owner}/${photo.id}`}><img key={i} src={`http://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`} alt='food'></img></a>
      return <img style= {this.state.Download.includes(url)?{ border: '3px solid #021a40' } : {}} key={i} src={url} alt={photo.title} onClick={()=>{this.addToDownload(url);}}></img>});
    return (
      
      <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        <input id="contents" type="text" placeholder="search text" onChange={(evt) => { this.getInput(evt)}} />
            <button id="submit" onClick={() => {  this.getPhotos();    }} >Get photos</button><br></br>
            
            <label>Photos<input type="radio" name="options" value="photos"  checked ={this.state.selectedOption==="photos"}onChange={(evt) => { this.getOption(evt)}}/></label><br></br>
            <label>User uploads<input type="radio" name="options" value="user uploads"  checked ={this.state.selectedOption==="user uploads"}onChange={(evt) => { this.getOption(evt)}}/></label><br></br>
            <label>User favourites<input type="radio" name="options" value="user favourites"  checked ={this.state.selectedOption==="user favourites"}onChange={(evt) => { this.getOption(evt)}}/></label><br></br>
            <button id="download" onClick={() => {  this.downloadPhotos();    }} >Download selected photos</button>
          
        </p>
      { 
        <div className="container">
        <footer className="row">
            
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
               { images }
            </div>
        </footer>
    </div>
        // photo url img src
      }

      
        
      </div>
    );
  }

}

export default App;
