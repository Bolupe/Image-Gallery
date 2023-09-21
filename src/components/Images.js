import React, { useContext, useEffect, useRef } from 'react';
import { ImageContext } from '../App';
import Image from './Image';
import { useAuth } from '../context/AuthContext';
import Sortable from 'sortablejs';

const Images = () => {
  const { response, isLoading, searchImage } = useContext(ImageContext);
  const { currentUser } = useAuth();

  const imageContainerRefs = useRef([]);

  useEffect(() => {
    const sortableContainer = new Sortable(document.getElementById('image-container'), {
      animation: 150,
      onEnd: handleDragEnd,
    });

    return () => {
      sortableContainer.destroy();
    };
  }, []);

  const handleDragEnd = (event) => {
    const { oldIndex, newIndex } = event;

    if (oldIndex !== newIndex) {
      // Clone the response array
      const updatedResponse = [...response];

      // Move the dragged item to the new position
      const [movedItem] = updatedResponse.splice(oldIndex, 1);
      updatedResponse.splice(newIndex, 0, movedItem);

      // Update the response state with the new order
      // Note: You may need to call an API to persist this order
      // in a real application.
      // This example updates the state only.
      // setResponse(updatedResponse);
    }
  };

  return (
    <div id="image-container" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10 max-w-7xl mx-auto px-4">
      {response.map((data, index) => (
        <div
          key={data.id}
          ref={(el) => (imageContainerRefs.current[index] = el)}
        >
          <Image data={data} currentUser={currentUser} />
        </div>
      ))}
    </div>
  );
};

export default Images;
