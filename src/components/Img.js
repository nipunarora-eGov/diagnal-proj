import React from 'react';

//This is an component to handle onError events on images
//for example if an image url is invalid then it renders a fallback div
export const Img = ({isBroken,setIsBroken,...props}) => {
  const { fallback = null } = props;

  /**
   * is our image broken?
   */
  

  function handleError() {
    setIsBroken(true);
  }

  if (isBroken) {
    return fallback;
  }

  return <img onError={handleError} {...props} />;
};
