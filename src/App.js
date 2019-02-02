import React from "react";
import Header from "./Components/Header";
import Image from "./Components/Image";

const electron = window.require('electron');
const {ipcRenderer} = electron;

let counter = 0;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      memeImages: [],
      imageData: {}
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ memeImages: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.memeImages.length) {      
      if(counter > this.state.memeImages.length){
        counter = 0;
      }
      this.setState({
        imageData: {
          imageUrl: this.state.memeImages[counter].url,
          topText: this.state.topText,
          bottomText: this.state.bottomText,
          handleSave: this.handleSave          
        }
      });
      counter++;
    }
  }

  handleSave(event){
    console.log('test');
    ipcRenderer.send(
      'message', 
      { 
        url: this.state.imageData.imageUrl, 
        topText: this.state.imageData.topText,
        bottomText: this.state.imageData.bottomText
      });
  }

  render() {
    const headerData = {
      handleChange: this.handleChange,
      topText: this.state.topText,
      bottomText: this.state.bottomText,
      handleSubmit: this.handleSubmit
    };
    return (
      <div>
        <Header headerData={headerData} />
        <Image data={this.state.imageData} />
      </div>
    );
  }
}

export default App;
