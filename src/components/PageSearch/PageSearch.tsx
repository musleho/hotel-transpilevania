'use client';

import { useState } from "react";
import Search from "../Search/Search"

const PageSearch = () => {
    const [roomTypeFilter, setRoomTypeFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

  return (
    <Search
        roomTypeFilter={roomTypeFilter}
        searchTerm={searchTerm}
        setRoomTypeFilter={setRoomTypeFilter}
        setSearchTerm={setSearchTerm}
    />
  )
}

export default PageSearch