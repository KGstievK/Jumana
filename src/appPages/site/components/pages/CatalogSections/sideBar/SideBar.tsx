"use client";
import scss from "./sideBar.module.scss";
import Image from "next/image";
import arrow from "@/assets/icons/Vector (Stroke).svg";
import { FC, useState } from "react";

type SectionKeys = "type" | "price" | "size" | "color";

const SideBar: FC = () => {
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

  return (
    <div className={scss.filterContainer}>
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
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Платье
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Абайка
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Юбка
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Платок
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Блузка
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Рубашки
            </label>
          </div>
        )}
      </div>

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
            <input type="number" placeholder="min." />
            <input type="number" placeholder="max." />
            <input type="range" min="0" max="1000" />
          </div>
        )}
      </div>

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
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              XXS
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              XS
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>S
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>M
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>L
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>XL
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              XXL
            </label>
          </div>
        )}
      </div>

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
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Чёрный
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Белый
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Айвори
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Зеленый
            </label>
            <label className={scss.checkboxContainer}>
              <input type="checkbox" />
              <span className={scss.customCheckbox}></span>
              Бардовый
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
