import { ReactElement } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
interface cardDashboardType {
  title: string;
  number1: string;
  number2: string;
  icon: ReactElement<any, any>;
  state: boolean;
}

function CardDashboard({
  title,
  number1,
  number2,
  icon,
  state,
}: cardDashboardType) {
  return (
    <div className="p-3 flex flex-row justify-between items-center bg-[rgba(0,0,0,0.3)] rounded-md">
      <div className="w-full flex flex-col gap-2">
        <p className="text-xs sm:text-sm">{title}</p>
        <p className="text-lg font-bold">{number1}</p>
        <div className="flex flex-row items-end">
          <div className="p-0.5">
            {state == true ? (
              <TbTriangleFilled fontSize={11} className="text-[rgb(0,255,0)]" />
            ) : (
              <TbTriangleInvertedFilled
                fontSize={11}
                className="text-[rgb(255,0,0)]"
              />
            )}
          </div>
          <p className="text-xs font-light">
            <span
              className={
                "font-bold " +
                (state == true ? "text-[rgb(0,255,0)]" : "text-[rgb(255,0,0)]")
              }
            >
              {" "}
              {number2}
            </span>{" "}
            from last week
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-center bg-[rgba(0,0,0,0.2)] p-1.5 rounded-md">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default CardDashboard;
