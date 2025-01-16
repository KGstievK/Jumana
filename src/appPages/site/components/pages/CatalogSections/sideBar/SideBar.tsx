"use client";
import scss from "./sideBar.module.scss";
import Image from "next/image";
import arrow from "@/assets/icons/Vector (Stroke).svg";
import { FC, useState } from "react";
import Cards from "../cards/Cards";

type SectionKeys = "type" | "price" | "size" | "color";

const SideBar: FC = () => {
  const [category, setCategory] = useState("");
  // const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const [openSections, setOpenSections] = useState<
    Record<SectionKeys, boolean>
  >({
    type: true,
    price: false,
    size: false,
    color: false,
  });

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

  return (
    <section className={scss.filter}>
      <div className={scss.filterContainer}>
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
              {["Платья", "Абайка", "Юбка", "Платок", "Блузка", "Рубашка"].map(
                (item) => (
                  <label key={item} className={scss.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={category === item}
                      onChange={() => handleCategoryChange(item)}
                    />
                    <span className={scss.customCheckbox}></span>
                    {item}
                  </label>
                )
              )}
            </div>
          )}
        </div>

        {/* ЦЕНА */}
        {/* <div className={scss.filterSection}>
          <div
            className={scss.filterHeader}
            onClick={() => toggleSection("price")}
          >
            <h4>ЦЕНА</h4>
            <Image src={arrow} alt="arrow" />
          </div>
          {openSections.price && (
            <div className={scss.filterContent}>
              <input
                type="number"
                placeholder="min."
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: +e.target.value })
                }
              />
              <input
                type="number"
                placeholder="max."
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: +e.target.value })
                }
              />
            </div>
          )}
        </div> */}

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
                    checked={selectedSize === size} // Проверка для одного выбранного размера
                    onChange={() => handleSizeChange(size)}
                  />
                  <span className={scss.customCheckbox}></span>
                  {size}
                </label>
              ))}
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
              {["Черный", "Белый", "Айвори", "Зеленый", "Бордовый"].map(
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
      </div>
      <Cards
        value={category}
        // priceRange={priceRange}
        size={selectedSize}
        color={selectedColor}
      />
    </section>
  );
};

export default SideBar;
