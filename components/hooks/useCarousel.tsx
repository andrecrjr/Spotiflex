import { useRef, useEffect, MutableRefObject } from 'react';

type CarouselRefs = {
  block_pane: MutableRefObject<HTMLUListElement>;
  nextStep: MutableRefObject<HTMLButtonElement>;
  previousStep: MutableRefObject<HTMLButtonElement>;
};

export const useCarousel = (): CarouselRefs => {
  const block_pane = useRef<HTMLUListElement>();
  const nextStep = useRef<HTMLButtonElement>();
  const previousStep = useRef<HTMLButtonElement>();
  const width = useRef<number>(0);

  useEffect(() => {
    const scrollWidth = block_pane.current?.scrollWidth ?? 0;
    const windowPane = block_pane.current?.clientWidth ?? 0;
    const carouselChildrenLength =
      block_pane.current?.firstChild?.childNodes.length ?? 0;
    const sizeOfChildren =
      carouselChildrenLength > 0 ? scrollWidth / carouselChildrenLength : 0;
    const totalCarouselChildrenLength = sizeOfChildren * carouselChildrenLength;
    const nextPath = windowPane / sizeOfChildren;

    const divCarousel = block_pane.current
      ?.children as HTMLCollectionOf<HTMLElement>;

    const setButtonOpacity = (
      button: HTMLButtonElement | undefined,
      opacity: number
    ) => {
      if (button) {
        button.style.opacity = opacity.toString();
        button.style.pointerEvents = opacity === 1 ? 'visible' : 'none';
        button.style.cursor = opacity === 1 ? 'pointer' : 'unset';
      }
    };

    const handleNextClick = (e: MouseEvent) => {
      e.preventDefault();
      if (scrollWidth - windowPane >= -totalCarouselChildrenLength) {
        const newWidth = width.current - sizeOfChildren * Math.floor(nextPath);
        divCarousel[0].style.transform = `translateX(${newWidth}px)`;
        width.current = newWidth;
        if (Math.abs(newWidth) >= scrollWidth - windowPane) {
          setButtonOpacity(nextStep.current, 0.1);
          setButtonOpacity(previousStep.current, 1);
        } else {
          setButtonOpacity(nextStep.current, 1);
          setButtonOpacity(previousStep.current, 1);
        }
      }
    };

    const handlePreviousClick = (e: MouseEvent) => {
      e.preventDefault();
      if (scrollWidth + windowPane > width.current && width.current !== 0) {
        width.current = width.current + sizeOfChildren * Math.floor(nextPath);
        divCarousel[0].style.transform = `translateX(${width.current}px)`;
        if (Math.abs(width.current) > 0) {
          setButtonOpacity(nextStep.current, 1);
          setButtonOpacity(previousStep.current, 1);
        }
        if (width.current === 0) {
          setButtonOpacity(nextStep.current, 1);
          setButtonOpacity(previousStep.current, 0.1);
        }
      }
    };

    setButtonOpacity(previousStep.current, 0.1);
    setButtonOpacity(nextStep.current, 1);

    if (scrollWidth <= windowPane) {
      setButtonOpacity(nextStep.current, 0.1);
    }
    if (nextStep.current) {
      nextStep.current.addEventListener('click', handleNextClick);
    }
    if (previousStep.current) {
      previousStep.current.addEventListener('click', handlePreviousClick);
    }
  }, []);

  const carouselRefs: CarouselRefs = {
    block_pane,
    nextStep,
    previousStep,
  };
  return carouselRefs;
};
