import React from "react";

function Header(props) {
  return (
    <form onSubmit={props.headerData.handleSubmit} className="container">
      <div className="form-row">
        <div className="form-group col-md-4 col-sm-4">
          <input
            type="text"
            placeholder="TopText"
            name="topText"
            onChange={props.headerData.handleChange}
            className = "form-control"
          />
        </div>
        <div className="form-group col-md-4 col-sm-4">
          <input
            type="text"
            placeholder="BottomText"
            name="bottomText"
            onChange={props.headerData.handleChange}
            className = "form-control"
          />
        </div>
        <div className="form-group col-md-4 col-sm-4">
          <button className="btn btn-primary mb-2"> Generate Image</button>
        </div>
      </div>      
    </form>
  );
}

export default Header;
