import { useContext, useState } from "react"
import { ImageContext } from "../App";
import 'tailwindcss/tailwind.css';


const SearchField = () => {
  const [searchValue, setSearchValue] = useState("");
  const { fetchData, setSearchImage } = useContext(ImageContext);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }
  const handleButtonSearch = () => {
    fetchData(`search/photos?page=1&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
    setSearchValue("");
    setSearchImage(searchValue);
  }
  const handleEnterSearch = e => {
    if(e.key === 'Enter') {
      fetchData(`search/photos?page=1&query=${searchValue}&client_id=${process.env.REACT_APP_ACCESS_KEY}`)
      setSearchValue("");
      setSearchImage(searchValue);
    }
  }

  return (
<div className="flex flex-col sm:flex-row items-center"> 
  <input
    className="bg-gray-50 border border-gray-300 text-sm w-full sm:w-1/2 md:w-2/3 lg:w-3/4 p-2.5 sm:mx-2 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl sm:rounded-tl-none sm:rounded-bl"
    type="search"
    placeholder="Search Anything..."
    value={searchValue}
    onChange={handleInputChange}
    onKeyDown={handleEnterSearch}
  />
  <button
    onClick={handleButtonSearch}
    disabled={!searchValue}
    className="bg-blue-600 px-4 py-2.5 text-white mt-2 sm:mt-0 sm:ml-2 max-w-[6rem] sm:max-w-none w-full sm:w-auto md:w-[8rem] lg:w-[9rem] rounded-bl rounded-tr sm:rounded-tr-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
  >
    Search
  </button>
</div>

  )
}

export default SearchField