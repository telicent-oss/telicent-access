import { useState } from "react"

const useSortBy = ({ defaultValue }) => {
  const [sortBy, setSortBy] = useState(defaultValue);

  const [ascend, setAscend] = useState(false);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  }

  const handleSortDirection = () => {
    setAscend((prevAscendState) => !prevAscendState )
  }

  return { sortBy, ascend, handleSortByChange, handleSortDirection }
}

export default useSortBy;