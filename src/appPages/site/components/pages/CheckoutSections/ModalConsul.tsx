import scss from "./ModalConsul.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Image from "next/image";
import { useGetPayQuery } from "@/redux/api/product";

interface ModalConsulProps {
  type: "form" | "success";
  onClose: (type?: "success" | null) => void;
}

const ModalConsul: React.FC<ModalConsulProps> = ({ type, onClose }) => {
  const { data } = useGetPayQuery();
  const isSuccess = type === "success";
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
          <>
            <h2 className={scss.title}>акчаны котор э!!!</h2>
            <Image
              width={400}
              height={400}
              src={data?.[0]?.pay_img || null}
              alt="scanner"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ModalConsul;
