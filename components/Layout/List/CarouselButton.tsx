import React from 'react';

const CarouselButton: React.FC<{
  fn: (e: React.MouseEvent) => void;
  iconValue: string;
}> = ({ fn, iconValue }) => {
  return (
    <button className='slider__button' onClick={fn}>
      {iconValue}
    </button>
  );
};

export default CarouselButton;
