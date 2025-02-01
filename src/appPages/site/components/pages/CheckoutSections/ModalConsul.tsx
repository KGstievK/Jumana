import { useState, useEffect } from "react";
import scss from "./ModalConsul.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Image from "next/image";
import { useGetPayQuery } from "@/redux/api/product";
import Link from "next/link";

interface ModalConsulProps {
  type: "form" | "success";
  onClose: (type?: "success" | null) => void;
}

interface Scaner {
  pay_img: string;
  info: string;
  number: string;
}

interface Pay {
  whatsapp: string;
  pay_title: [
    {
      pay_img: string;
      number: string;
      info: string;
    }
  ];
}

const ModalConsul: React.FC<ModalConsulProps> = ({ type, onClose }) => {
  const { data } = useGetPayQuery<{ data: Pay[] }>();
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (data) {
      console.log("Payment Data:", data);
    }
  }, [data]);

  const isSuccess = type === "success";

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageError = (idx: number) => {
    setImgError((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div className={scss.modal} onClick={handleOverlayClick}>
      <div className={scss.modalContent}>
        <p className={scss.close} onClick={() => onClose()}>
          <IoCloseOutline />
        </p>
        {isSuccess ? (
          <div className={scss.icon}>
            <div className={scss.icon1}>
              <h1>
                <IoIosCheckmarkCircle />
              </h1>
              <h2>Спасибо!</h2>
              <p>Ваша заявка успешно отправлена!</p>
            </div>
          </div>
        ) : (
          <div className={scss.window_modal}>
            <div className={scss.box}>
              {data?.[0]?.pay_title?.map((el: Scaner, idx: number) => (
                <div key={idx} className={scss.block}>
                  <Image
                    width={300}
                    height={300}
                    src={imgError[idx] ? "/fallback-image.jpg" : el?.pay_img}
                    alt={`scanner-${idx}`}
                    onError={() => handleImageError(idx)}
                    priority
                  />
                  <h4 className={scss.title}>{el.number}</h4>
                  <p>{el.info}</p>
                </div>
              ))}
            </div>
            <Link href={data?.[0]?.whatsapp || "#"}>
              <button className={scss.button}>отправьте чек</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalConsul;
