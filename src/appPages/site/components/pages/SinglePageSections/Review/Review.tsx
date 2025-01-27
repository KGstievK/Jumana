import { Flex, Rate } from "antd";
import scss from "./Review.module.scss";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostReviewMutation } from "@/redux/api/review";
import { REVIEW } from "@/redux/api/review/types";
import { useGetMeQuery } from "@/redux/api/auth";
import {
  useGetAllClothesQuery,
  useGetClothesByIdQuery,
} from "@/redux/api/category";
import { useParams } from "next/navigation";

const Review = () => {
  const id = useParams();
  console.log("🚀 ~ Review ~ id:", id);
  const { data: userResponse } = useGetMeQuery();
  const { data: clothesResponse } = useGetClothesByIdQuery(Number(id.single));
  const { register, handleSubmit } = useForm<REVIEW.ReviewRequest>();
  const [value, setValue] = useState(0);

  const [PostReviewMutation] = usePostReviewMutation();

  const onSubmit: SubmitHandler<REVIEW.ReviewRequest> = async (ReviewData) => {
    if (!userResponse?.map((el) => el.id)) {
      console.error("User data not available");
      return;
    }

    // if (!clothesResponse || clothesResponse.length === 0) {
    //   console.error("Clothes data not available");
    //   return;
    // }

    const ReviewDataRest: REVIEW.ReviewRequest = {
      author: userResponse[0].id,
      text: ReviewData.text,
      stars: value,
      clothes_review: clothesResponse?.id,
    };

    try {
      const { data } = await PostReviewMutation(ReviewDataRest);
      console.log("Review submitted successfully:", data);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const desc = ["Очень плохо", "Плохо", "Нормально", "Хорошо", "Отлично"];

  return (
    <section className={scss.Review}>
      <div className={scss.content}>
        <h1 className="title">Отзывы</h1>
        <div className={scss.ReviewBlock}>
          <div className={scss.ReviewForm}>
            <h2>Оставить отзыв</h2>
            <p>Оставляйте свои комментарии здесь для других клиентов</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex
                gap="middle"
                vertical
                className={scss.Flex}
              >
                <Rate tooltips={desc} onChange={setValue} value={value} className={scss.Rate}/>
                {value ? <span>{desc[value - 1]}</span> : null}
              </Flex>
              <textarea
                {...register("text")}
                placeholder="Введите текст отзыва"
              />
              <button type="submit">Отправить отзыв</button>
            </form>
          </div>
          <div className={scss.ReviewComment}></div>
        </div>
      </div>
    </section>
  );
};

export default Review;
