import React, { forwardRef } from 'react';

const CarouselButton = forwardRef<HTMLButtonElement, { iconValue: string }>(
  ({ iconValue }, ref) => {
    return (
      <button className='slider__button' ref={ref}>
        {iconValue}
      </button>
    );
  }
);

export default CarouselButton;
