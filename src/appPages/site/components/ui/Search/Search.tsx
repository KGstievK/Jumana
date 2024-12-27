import Image from "next/image";
import scss from "./Search.module.scss";
import search from "@/assets/icons/Search.svg";
import { useState } from "react";
import { serialize } from "v8";

const Search = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={scss.Search}
      style={{
        maxWidth: isOpen ? "350px" : "",
        border: isOpen ? "2px solid var(--main-color)" : "",
        borderRadius: isOpen ? "15px" : "15px",
        padding: isOpen ? "0 20px" : "",
      }}
    >
      <input
        type="text"
        style={{
          display: isOpen ? "flex" : "",
        }}
      />
      <button className={scss.SearchBtn} onClick={() => setIsOpen(!isOpen)}>
        <Image src={search} alt="Search" />
      </button>
    </div>
  );
};

export default Search;


