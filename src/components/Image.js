import React from 'react';

const Image = ({ data, currentUser }) => {
  const imageUrl = currentUser ? data.urls.regular : data.urls.small;
  const imageClassName = currentUser ? '' : 'blur-image'; // Add a CSS class for blurring when not logged in

  return (
    <a href={data.urls.regular} target="_blank" rel="noreferrer">
      <img
        className={`h-72 w-full object-cover rounded-lg shadow-md ${imageClassName}`}
        src={imageUrl}
        alt={data.alt_description}
      />
    </a>
  );
};

export default Image;
