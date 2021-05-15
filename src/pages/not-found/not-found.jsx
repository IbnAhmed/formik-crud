import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="">
        404
        <br/>
        Page Not Found!
      </h2>

      <Link to={`/`} className={`btn`}>
        Home
      </Link>
    </div>
  );
};

export default NotFound;
