"use client";
import scss from "./sideBar.module.scss";
import Image from "next/image";
import arrow from "@/assets/icons/Vector (Stroke).svg";
import { FC, useState } from "react";
import Cards from "../cards/Cards";
import filterImg from "@/assets/icons/Filter.svg";

type SectionKeys = "type" | "price" | "size" | "color";

const SideBar: FC = () => {
  const [category, setCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });

  const [openSections, setOpenSections] = useState<
    Record<SectionKeys, boolean>
  >({
    type: true,
    price: false,
    size: false,
    color: false,
  });

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const toggleSection = (section: SectionKeys) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (value: string) => {
    setCategory((prev) => (prev === value ? "" : value));
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize((prev) => (prev === size ? "" : size));
  };

  const handleColorChange = (color: string) => {
    setSelectedColor((prev) => (prev === color ? "" : color));
  };

  const handlePriceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = e.target.value;
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <section className={scss.filter}>
      <div className={scss.blockFilter}>
        <div className={scss.header} onClick={toggleSideBar}>
          <Image
            width={20}
            height={30}
            layout="intrinsic"
            src={filterImg}
            alt="photo"
          />
          <h4>ФИЛЬТР</h4>
        </div>

        <div
          className={`${scss.filterContainer} ${
            isSideBarOpen ? scss.open : ""
          }`}
        >
          {/* ВИД */}
          <div className={scss.filterSection}>
            <div
              className={scss.filterHeader}
              onClick={() => toggleSection("type")}
            >
              <h4>ВИД</h4>
              <Image src={arrow} alt="arrow" />
            </div>
            {openSections.type && (
              <div className={scss.filterContent}>
                {[
                  "Платья",
                  "Абайка",
                  "Юбка",
                  "Платок",
                  "Блузка",
                  "Рубашка",
                ].map((item) => (
                  <label key={item} className={scss.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={category === item}
                      onChange={() => handleCategoryChange(item)}
                    />
                    <span className={scss.customCheckbox}></span>
                    {item}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* РАЗМЕР */}
          <div className={scss.filterSection}>
            <div
              className={scss.filterHeader}
              onClick={() => toggleSection("size")}
            >
              <h4>РАЗМЕР</h4>
              <Image src={arrow} alt="arrow" />
            </div>
            {openSections.size && (
              <div className={scss.filterContent}>
                {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <label key={size} className={scss.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={selectedSize === size}
                      onChange={() => handleSizeChange(size)}
                    />
                    <span className={scss.customCheckbox}></span>
                    {size}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* ЦЕНА */}
          <div className={scss.filterSection}>
            <div
              className={scss.filterHeader}
              onClick={() => toggleSection("price")}
            >
              <h4>ЦЕНА</h4>
              <Image src={arrow} alt="arrow" />
            </div>
            {openSections.price && (
              <div className={scss.filterContent}>
                <div className={scss.priceInputs}>
                  <input
                    type="number"
                    placeholder="Мин"
                    value={priceRange.min}
                    onChange={(e) => handlePriceInputChange(e, "min")}
                  />
                  <input
                    type="number"
                    placeholder="Макс"
                    value={priceRange.max}
                    onChange={(e) => handlePriceInputChange(e, "max")}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ЦВЕТ */}
          <div className={scss.filterSection}>
            <div
              className={scss.filterHeader}
              onClick={() => toggleSection("color")}
            >
              <h4>ЦВЕТ</h4>
              <Image src={arrow} alt="arrow" />
            </div>
            {openSections.color && (
              <div className={scss.filterContent}>
                {["Черный", "Белый", "Серый", "Коричневый", "Бордовый"].map(
                  (color) => (
                    <label key={color} className={scss.checkboxContainer}>
                      <input
                        type="checkbox"
                        checked={selectedColor.includes(color)}
                        onChange={() => handleColorChange(color)}
                      />
                      <span className={scss.customCheckbox}></span>
                      {color}
                    </label>
                  )
                )}
              </div>
            )}
          </div>

          <div
            className={scss.clearFilter}
            onClick={() => {
              setCategory("");
              setSelectedSize("");
              setSelectedColor("");
              setPriceRange({ min: "", max: "" });
            }}
          >
            <button>Очистить x</button>
          </div>
        </div>
      </div>

      <Cards
        value={category}
        size={selectedSize}
        color={selectedColor}
        priceRange={[
          parseInt(priceRange.min) || 0,
          parseInt(priceRange.max) || Infinity,
        ]}
      />
    </section>
  );
};

export default SideBar;
