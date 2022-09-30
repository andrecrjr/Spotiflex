import { useRef, useEffect, MutableRefObject } from 'react';

export const useCarousel = (): {
  block_pane: MutableRefObject<HTMLUListElement>;
  nextStep: MutableRefObject<HTMLButtonElement>;
  previousStep: MutableRefObject<HTMLButtonElement>;
} => {
  const block_pane = useRef<HTMLUListElement>();
  const nextStep = useRef<HTMLButtonElement>();
  const previousStep = useRef<HTMLButtonElement>();

  const width = useRef(0);

  useEffect(() => {
    const scrollWidth = block_pane.current?.scrollWidth;
    const windowPane = block_pane.current?.clientWidth;
    const carouselChildrenLength =
      block_pane.current?.firstChild.childNodes.length;
    const sizeOfChildren = scrollWidth / carouselChildrenLength;
    const totalCarouselChildrenLength = sizeOfChildren * carouselChildrenLength;
    const nextPath = windowPane / sizeOfChildren;

    const { current: divCarousel } = block_pane;

    const blockPane = divCarousel?.children as HTMLCollectionOf<HTMLElement>;

    if (previousStep.current && width.current === 0) {
      previousStep.current.style.opacity = '0.1';
    }

    nextStep.current?.addEventListener('click', (e) => {
      e.preventDefault();
      if (scrollWidth - windowPane >= -totalCarouselChildrenLength) {
        const newWidth = width.current - sizeOfChildren * Math.floor(nextPath);
        blockPane[0].style.transform = `translateX(${newWidth}px)`;
        width.current = newWidth;
        if (Math.abs(newWidth) >= scrollWidth - windowPane) {
          nextStep.current.style.opacity = '0.1';
          nextStep.current.style.pointerEvents = 'none';
          nextStep.current.style.cursor = 'unset';
          previousStep.current.style.opacity = '1';
        } else {
          previousStep.current.style.opacity = '1';
          nextStep.current.style.pointerEvents = 'visible';
          nextStep.current.style.cursor = 'pointer';
        }
      }
    });

    previousStep.current?.addEventListener('click', (e) => {
      e.preventDefault();
      if (scrollWidth + windowPane > width.current && width.current !== 0) {
        width.current = width.current + sizeOfChildren * Math.floor(nextPath);
        blockPane[0].style.transform = `translateX(${width.current}px)`;
        if (Math.abs(width.current) > 0) {
          previousStep.current.style.opacity = '1';
          nextStep.current.style.opacity = '1';
          nextStep.current.style.pointerEvents = 'visible';
          nextStep.current.style.cursor = 'pointer';
        } else {
          nextStep.current.style.opacity = '1';
          previousStep.current.style.opacity = '0.1';
          nextStep.current.style.pointerEvents = 'visible';
        }
      }
    });
  }, []);

  return { block_pane, nextStep, previousStep };
};
