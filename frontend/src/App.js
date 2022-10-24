import './App.css';
import React, {Component} from 'react';
import Navigation from "./components/Navigation/Navigation"
import ImageOutput from "./components/ImageOutput/ImageOutput"
import ImageInput from "./components/ImageInput/ImageInput"
import Error from "./components/ImageInput/Error"
import Animate from "./components/Animate/Animate"
import Loading from "./components/ImageInput/Loading"
import axios from "axios";

class App extends Component{
  constructor(){
    super();
    this.state = {
      file: "", 
      image: false, 
      image_caption: "",
      image_uploading: false, 
      started: false, 
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = async (event) => {
    await this.setState({file:event, image_uploading: true, started: true, image:false, error: false});
    let reader = new FileReader()
    reader.readAsDataURL(this.state.file)
    reader.addEventListener("load", function() {
      document.getElementById("previewImage").src = reader.result
    })
    let formData = new FormData();
    formData.append("image", this.state.file)

    await axios.post("http://127.0.0.1:8000/api/submit/", formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(response => {
      if(response['data'] === "Failed"){
      this.setState({error:true})}
      else{
        this.setState({
        image_caption: response['data'], 
        image_uploading: false, 
        image: true})}
    });
  }


  render(){
  return (
    <div className="App">
      <Navigation/>
      <Animate started={this.state.started}/>
      <ImageInput handleChange={this.handleChange}/>

      {this.state.error === true && <Error/>}

      {this.state.image_uploading === true &&
        <Loading/>}

      {this.state.image_caption !== "" && this.state.image === true &&
        <ImageOutput image_caption={this.state.image_caption}/>}

    </div>
    
  );
}}

export default App;
