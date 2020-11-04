// UncontrolledLottie.jsx
import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/18884-home-animation.json";
import { Link } from "react-router-dom";

class UncontrolledLottie extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <h1>Lottie</h1>
        <p>test weee</p>
        <Link to="/">
          <Lottie options={defaultOptions} height={400} width={400} />
        </Link>
      </div>
    );
  }
}

export default UncontrolledLottie;
