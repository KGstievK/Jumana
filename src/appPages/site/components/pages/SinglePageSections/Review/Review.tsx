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
import Link from "next/link";

const Review = () => {
  const id = useParams();
  const { data: userResponse, status } = useGetMeQuery();
  const { data: clothesResponse } = useGetClothesByIdQuery(Number(id.single));
  const { register, handleSubmit } = useForm<REVIEW.ReviewRequest>();
  const [value, setValue] = useState(0);

  const [PostReviewMutation] = usePostReviewMutation();

  const onSubmit: SubmitHandler<REVIEW.ReviewRequest> = async (ReviewData) => {
    if (!userResponse?.map((el) => el.id)) {
      return;
    }
    const ReviewDataRest: REVIEW.ReviewRequest = {
      author: userResponse[0].id,
      text: ReviewData.text,
      stars: value,
      clothes_review: clothesResponse?.id,
    };

    try {
      const { data } = await PostReviewMutation(ReviewDataRest);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const desc = ["Очень плохо", "Плохо", "Нормально", "Хорошо", "Отлично"];

  if (status === "fulfilled") {
    return (
      <section className={scss.Review}>
        <div className={scss.content}>
          <h1 className="title">Отзывы</h1>
          <div className={scss.ReviewBlock}>
            <div className={scss.ReviewForm}>
              <h2>Оставить отзыв</h2>
              <p>Оставляйте свои комментарии здесь для других клиентов</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex gap='middle' vertical className={scss.Flex}>
                  <Rate
                    tooltips={desc}
                    onChange={setValue}
                    value={value}
                    className={scss.Rate}
                  />
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
  }
  if (status === "rejected") {
    return (
      <section className={scss.Review}>
        <div className={scss.content}>
          <h1 className="title">Отзывы</h1>
          <div className={scss.ReviewBlock}>
            <div className={scss.ReviewForm}>
              <h2>Оставить отзыв</h2>
              <p>Оставляйте свои комментарии здесь для других клиентов</p>
              <Link href="auth/sign-in">
                <button>Войти</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Review;
