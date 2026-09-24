"use client";

import React, { useState } from "react";
import Candle from "@/components/Candle";

const FreeSpace = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      {show ? (
        <div className="w-full h-full flex flex-col items-center justify-between text-white">
          <p className="text-[2rem]">
            You’re doing better than you think
          </p> 

          <Candle />

          <button
            onClick={() => setShow(false)}
            className="text-white border border-white/30 rounded-xl px-4 py-2 hover:bg-white/10 transition"
          >
            Hide
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShow(true)}
          className="text-white border border-white/30 rounded-xl px-4 py-2 hover:bg-white/10 transition absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          Click me
        </button>
      )}
    </>
  );
};

export default FreeSpace;