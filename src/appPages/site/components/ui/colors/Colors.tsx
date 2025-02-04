"use client";

import { FC, useState } from "react";
import s from "./colors.module.scss";

interface IClothesImg {
  id?: number | null;
  photo: string;
  color: string;
}
interface IPropsColors {
  clothesImg: IClothesImg[];
  onClick?: (item: IClothesImg) => void;
}
const ColorsClothes: FC<IPropsColors> = ({ clothesImg, onClick }) => {
  const [selectedColor, setSelectedColor] = useState<IClothesImg | null>(null);

  const getColor = (color: string) => {
    const colorMap: Record<string, string> = {
      серый: "gray",
      коричневый: "brown",
      синий: "blue",
      зеленый: "green",
      красный: "red",
      желтый: "yellow",
      оранжевый: "orange",
      черный: "black",
      белый: "white",
      фиолетовый: "purple",
      розовый: "pink",
      голубой: "lightblue",
      бирюзовый: "turquoise",
      бежевый: "beige",
      золотой: "gold",
      серебряный: "silver",
      бордовый: "maroon",
      // Добавляем английские названия
      gray: "gray",
      brown: "brown",
      blue: "blue",
      green: "green",
      red: "red",
      yellow: "yellow",
      orange: "orange",
      black: "black",
      white: "white",
      purple: "purple",
      pink: "pink",
      lightblue: "lightblue",
      turquoise: "turquoise",
      beige: "beige",
      gold: "gold",
      silver: "silver",
      maroon: "maroon",
    };

    return colorMap[color.toLowerCase()] || "transparent";
  };

  const handleColorClick = (item: IClothesImg) => {
    setSelectedColor(item);
    onClick?.(item);
  };

  return (
    <div className={s.container}>
      {clothesImg.map((item) => (
        <div
          key={item.id ?? item.color}
          className={`${s.circle} ${
            selectedColor?.id === item.id ? s.selected : ""
          }`}
          style={{ backgroundColor: getColor(item.color) }}
          title={item.color}
          onClick={() => handleColorClick(item)}
        />
      ))}
    </div>
  );
};

export default ColorsClothes;
