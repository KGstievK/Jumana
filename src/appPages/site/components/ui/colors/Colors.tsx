"use client";
import { FC } from "react";

interface IClothesImg {
  photo: string;
  color: string;
}
interface IPropsColors {
  clothesImg: IClothesImg[];
}
const ColorsClothes: FC<IPropsColors> = ({ clothesImg }) => {
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

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {clothesImg.map((item, index) => (
        <div
          key={index}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: getColor(item.color),
            border: "1px solid black",
          }}
          title={item.color} // Показывает название цвета при наведении
        ></div>
      ))}
    </div>
  );
};

export default ColorsClothes;
