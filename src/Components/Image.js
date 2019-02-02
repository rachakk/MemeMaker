import React from "react";

function Image(props) {
	let styles = {
	    display: 'block',
	    minWidth: '400px',
	    maxWidth: '500px',
	    minHeight: '400px',
	    maxHeight: '500px',
	    margin: '0 auto',
	    position: 'relative'
  };  
  return (
    <div style = {{position: 'relative'}}>
      <img style={styles} 
      src={props.data.imageUrl} alt={props.data.imageUrl}/>
      <p style = {{position: 'absolute', top: 0}} >{props.data.topText}</p>
      <p className="BottomText">{props.data.bottomText}</p>
      <button type="button" 
      	style = {{display: 'block', margin: '0 auto'}} 
      	className="btn btn-primary btn-lg"
      	onClick = {props.data.handleSave}> SAVE!</button>
    </div>
  );
}

export default Image;
