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
  const [selectedColor, setSelectedColor] = useState<IClothesImg | null>(null); // Состояние для выбранного цвета

  const getColor = (color: string) => {
    switch (color.toLowerCase()) {
      case "серый":
        return "gray";
      case "коричневый":
        return "brown";
      case "синий":
        return "blue";
      case "зеленый":
        return "green";
      case "красный":
        return "red";
      case "желтый":
        return "yellow";
      case "оранжевый":
        return "orange";
      case "черный":
        return "black";
      case "белый":
        return "white";
      case "фиолетовый":
        return "purple";
      case "розовый":
        return "pink";
      case "голубой":
        return "lightblue";
      case "бирюзовый":
        return "turquoise";
      case "бежевый":
        return "beige";
      case "золотой":
        return "gold";
      case "серебряный":
        return "silver";
      case "бордовый":
        return "maroon";
      default:
        return "transparent";
    }
  };

  const handleColorClick = (item: IClothesImg) => {
    setSelectedColor(item); // Устанавливаем выбранный цвет в состояние
    onClick?.(item); // Вызовем внешний onClick, если он передан
  };

  return (
    <div className={s.container}>
      {clothesImg.map((item) => (
        <div
          key={item.id ?? item.color} // Используем `item.id`, или `item.color`, если id null
          className={`${s.circle} ${
            selectedColor?.id === item.id ? s.selected : ""
          }`} // Добавляем класс для выбранного цвета
          style={{ backgroundColor: getColor(item.color) }}
          title={item.color}
          onClick={() => handleColorClick(item)} // Обработчик нажатия
        />
      ))}
    </div>
  );
};

export default ColorsClothes;
