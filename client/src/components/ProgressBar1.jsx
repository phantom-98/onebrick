import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProgressBar1 = ({ height }) => {
  const { sold } = useSelector((state) => state.admin);

  return (
    <div className="flex flex-col gap-1 items-center leading-4 z-10">
      <div className="w-full text-center">
        ₹ {(sold * 0.1).toFixed(1)} lakhs raised of ₹ 32 crore goal
      </div>
      <div className={`w-full bg-gray-300 h-${height}`}>
        <div
          className={`bg-sky-700 h-${height}`}
          style={{ width: `${(sold / 40000) * 100}%` }}
        ></div>
      </div>
      <p className="w-full text-center">{sold} donations</p>
    </div>
  );
};

ProgressBar1.propTypes = {
  height: PropTypes.number.isRequired,
};

export default ProgressBar1;
