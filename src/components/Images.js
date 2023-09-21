import React, { useContext } from 'react';
import { ImageContext } from '../App';
import { Draggable, Droppable, DragDropContext} from 'react-beautiful-dnd';
import Image from './Image';
import { useAuth } from '../context/AuthContext';

const Images = () => {
  const { response, isLoading, searchImage, handleDragEnd } = useContext(
    ImageContext
  );

  const { currentUser } = useAuth(); // Access the currentUser from AuthContext

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <h1 className="text-center mt-6 underline text-2xl">
          Results for {searchImage || 'Wallpapers'}
        </h1>
        <Droppable droppableId="image-list" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10 max-w-7xl mx-auto px-4"
            >
              {isLoading ? (
                response.map((data, index) => (
                  <Draggable key={data.id} draggableId={data.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Image data={data} currentUser={currentUser} /> {/* Pass currentUser to the Image component */}
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                response.map((data, index) => (
                  <Draggable key={data.id} draggableId={data.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Image data={data} currentUser={currentUser} /> {/* Pass currentUser to the Image component */}
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Images;
