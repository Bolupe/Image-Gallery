import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (param = "") => {
  // Initialize state variables
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set the base URL for Axios requests
  axios.defaults.baseURL = 'https://api.unsplash.com';

  // Define the fetchData function to make API requests
  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      // Append parameters to the URL to fetch 12 items (you may need to adjust this)
      const res = await axios(url + '&per_page=12'); // Assuming your API supports 'per_page' parameter
      setResponse(res.data.results);
      setError(null); // Clear the error on successful request
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Use the useEffect hook to fetch data when the 'param' dependency changes
  useEffect(() => {
    fetchData(param);
  }, [param]);

  // Return the response, loading state, error, and a function to fetch data
  return {
    response,
    isLoading,
    error,
    fetchData: url => fetchData(url),
  };
};

export default useAxios;
