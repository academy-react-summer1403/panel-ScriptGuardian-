import React from "react";
import { ClipLoader } from "react-spinners";

const CustomSpinner = ({ style, color, size, style2 }) => {
  const save = "d-flex justify-content-center align-items-center mx-auto";
  return (
    <div className={style ? style : {}} style={style2 ? style2 : {}}>
      <ClipLoader
        color={`${color ? color : "text-primary"} `}
        size={size ? size : 50}
        speedMultiplier={1.5}
      />
    </div>
  );
};

export default CustomSpinner;
