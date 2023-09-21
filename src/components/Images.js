import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImageContext } from '../App';
import Image from './Image';
import { useAuth } from '../context/AuthContext';
import Sortable from 'sortablejs';
import Skeleton from './Skeleton';

const Images = () => {
  const { response, isLoading, searchImage } = useContext(ImageContext);
  const { currentUser } = useAuth();

  const [showSkeleton, setShowSkeleton] = useState(isLoading);

  const imageContainerRefs = useRef([]);
  const sortableContainerRef = useRef(null); // Ref for the Sortable container

  useEffect(() => {
    setShowSkeleton(isLoading); // Show the skeleton loader while loading

    if (currentUser) {
      // Initialize SortableJS only if the user is logged in
      const sortableContainer = new Sortable(sortableContainerRef.current, {
        animation: 150,
        onEnd: handleDragEnd,
      });

      return () => {
        sortableContainer.destroy();
      };
    }
  }, [currentUser, isLoading]); // Update when currentUser or isLoading changes

  useEffect(() => {
    // Hide the skeleton loader once the images are loaded
    if (!isLoading) {
      setShowSkeleton(false);
    }
  }, [isLoading]);

  const handleDragEnd = (event) => {
    const { oldIndex, newIndex } = event;

    if (oldIndex !== newIndex) {
      // Clone the response array...
      const updatedResponse = [...response];

      // Move the dragged item to the new position
      const [movedItem] = updatedResponse.splice(oldIndex, 1);
      updatedResponse.splice(newIndex, 0, movedItem);
    }
  };

  return (
    <div>
      <div
        ref={sortableContainerRef}
        id="image-container"
        className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10 max-w-7xl mx-auto px-4 ${
          currentUser ? '' : 'pointer-events-none' // Disable pointer events for logged-out users
        }`}
      >
        {response.map((data, index) => (
          <div
            key={data.id}
            ref={(el) => (imageContainerRefs.current[index] = el)}
          >
            {showSkeleton ? (
              <Skeleton item={1} />
            ) : (
              <Image data={data} currentUser={currentUser} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
