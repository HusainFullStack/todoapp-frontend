import React from "react";

const Button = ({ style, text, loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-2.5 rounded-lg cursor-pointer text-white font-bold transition ${style}`}
    >
      {text}
    </button>
  );
};

export default Button;
