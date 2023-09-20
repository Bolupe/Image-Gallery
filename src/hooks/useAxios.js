import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (param = "") => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  axios.defaults.baseURL = "https://api.unsplash.com";

  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      const res = await axios(url + "&per_page=12");
      // Assign unique IDs based on the index in the response array
      const imagesWithIds = res.data.results.map((image, index) => ({
        ...image,
        id: `image-${index}`,
      }));
      setResponse(imagesWithIds);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(param);
  }, [param]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // Get the dragged item's index
    const sourceIndex = result.source.index;

    // Get the dropped item's index
    const destinationIndex = result.destination.index;

    // Create a copy of the response array
    const updatedImages = [...response];

    // Remove the dragged item from the original position
    const [reorderedImage] = updatedImages.splice(sourceIndex, 1);

    // Insert the dragged item into the new position
    updatedImages.splice(destinationIndex, 0, reorderedImage);

    // Update the state with the new order
    setResponse(updatedImages);
  };

  // Return the updated response and the handleDragEnd function
  return {
    response,
    isLoading,
    error,
    fetchData: (url) => fetchData(url),
    handleDragEnd: handleDragEnd,
  };
};

export default useAxios;
