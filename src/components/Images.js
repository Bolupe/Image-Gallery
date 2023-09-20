import { useContext } from "react";
import { ImageContext } from "../App";
import Image from "./Image";
import Skeleton from "./Skeleton";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Images = () => {
  const { response, isLoading, searchImage, handleDragEnd } = useContext(
    ImageContext
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <h1 className="text-center mt-6 underline text-2xl">
          Results for {searchImage || "Wallpapers"}
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
                  <Draggable
                    key={data.id}
                    draggableId={data.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Image data={data} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                response.map((data, index) => (
                  <Draggable
                    key={data.id}
                    draggableId={data.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Image data={data} />
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
