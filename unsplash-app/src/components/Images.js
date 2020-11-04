import React from "react";
import "./Images.css";
import ImageCard from "./ImageCard";
// import Loading from "./Loading"; // would need to refactor this add it to submit later to be less jarring for user.
// a better loader would be a mini spinner icon on a submit button or something.

const Images = (props) => {
  if (props.loading) {
    return <h1>Loading...</h1>;
  }
  if (!props.images) {
    return null;
  }
  const images = props.images.map((image) => {
    return (
      <ImageCard
        key={image.id}
        id={image.id}
        image={image}
        onImageSelect={() => props.onImageSelect(image)}
      />
    );
  });
  return <div className="image">{images}</div>;
};

export default Images;
