// refactor to use material ui
import React from "react";

import { Link } from "react-router-dom";

const Navigation = ({ icon, title }) => {
  return (
    <div className="">
      <ul className="-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
