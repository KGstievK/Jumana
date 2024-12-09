import scss from "./History.module.scss";

const History = () => {
  return (
    <section className={scss.History}>
      <div className="container">
        <div className={scss.content}>
          <h1>История заказов</h1>
          <p>Отслеживание, возврат или покупка товаров</p>
          
        </div>
      </div>
    </section>
  );
};

export default History;
