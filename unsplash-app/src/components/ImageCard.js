import React from "react";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { spans: 0 };

    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
    // console.log(this.imageRef.current.clientHeight);
  }

  // call back no longer required
  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10);
    this.setState({ spans: spans });
  };

  render() {
    const { description, urls } = this.props.image;
    const { onImageSelect } = this.props;
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img
          ref={this.imageRef}
          src={urls.regular}
          alt={description}
          onClick={onImageSelect}
        />
      </div>
    );
  }
}

export default ImageCard;
