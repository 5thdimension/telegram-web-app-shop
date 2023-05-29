/* eslint-disable object-curly-newline */
import { Button } from "antd";
import { Link } from "react-router-dom";

interface Props {
  url: string;
  title: string;
  price: number;
  quantity: number;
  imageURL: string | [];
}
function Card({ url, title, price, quantity, imageURL }: Props) {
  return (
    <Link
      to={url}
      className=" flex h-[220px] w-full flex-col overflow-hidden  rounded-lg border-2 border-[var(--tg-theme-secondary-bg-color)]">
      <div
        className=" ml-auto h-40 w-full  bg-[var(--tg-theme-secondary-bg-color)] bg-cover bg-no-repeat "
        style={{ backgroundImage: `url('${imageURL}')` }}
      />
      <div className="flex h-full w-full flex-col items-start justify-between gap-3 p-2">
        <div className="mb-1 ml-auto h-5 w-full select-none text-right ">
          {title}
        </div>
        <div className="flex w-full  flex-col gap-2">
          {/* <div className="flex items-center justify-between">
            <div className="rounded-xl bg-[var(--tg-theme-secondary-bg-color)] px-1 pt-1 text-sm ">
              ⭐4.3
            </div>
            <div className="select-none text-sm">غذا</div>
          </div> */}
          <div className="self-end text-right">قیمت :{price} تومان</div>
          {/* <div className="self-start text-left">تعداد :{quantity} عدد</div> */}
        </div>
        <Button className="w-full self-end" type="default">
          دیدن محصول
        </Button>
      </div>
    </Link>
  );
}

export default Card;
