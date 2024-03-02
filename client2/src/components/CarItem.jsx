import React from "react";

const CarItem = () => {
 
  return (
    <div className="car__item flex flex-col items-center justify-center ml-32 mt-12">
      <div className="car__item-top">
        <div className="car__item-tile">
          <h3 className="text-3xl font-bold text-[#ef621c]">Ather 450X</h3>
          <span>
            <i class="ri-heart-line"></i>
          </span>
        </div>
        <p className="text-slate-400">Scooter / Bike</p>
      </div>

      <div className="car__img mt-6 h-[300px] w-[300px]">
        <img src="Ather-450X.png" alt="" />
      </div>


    </div>
  );
};

export default CarItem;