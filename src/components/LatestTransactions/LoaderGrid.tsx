import React, { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/LoaderGrid.module.css';

interface LoaderGridProps {
  innerRef?: RefObject<HTMLDivElement>;
}

const LoaderGrid = ({ innerRef }: LoaderGridProps) => {
  const squareRef1 = useRef<HTMLDivElement | null>(null);
  const squareRef2 = useRef<HTMLDivElement | null>(null);
  const squareRef3 = useRef<HTMLDivElement | null>(null);
  const squareRef4 = useRef<HTMLDivElement | null>(null);
  const squareRef5 = useRef<HTMLDivElement | null>(null);
  const squareRef6 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, duration: 0.1 });
    tl.fromTo(
      squareRef1.current,
      { autoAlpha: 1, duration: 0.01 },
      { autoAlpha: 0.3, duration: 0.01 },
    )
      .fromTo(
        squareRef2.current,
        { autoAlpha: 0.3 },
        { autoAlpha: 1, duration: 0.01 },
      )
      .to(squareRef2.current, { autoAlpha: 0.3, duration: 0.01 }, '+=0.15')
      .fromTo(
        squareRef4.current,
        { autoAlpha: 0.3 },
        { autoAlpha: 1, duration: 0.01 },
      )
      .to(squareRef4.current, { autoAlpha: 0.3, duration: 0.01 }, '+=0.15')
      .fromTo(
        squareRef6.current,
        { autoAlpha: 0.3 },
        { autoAlpha: 1, duration: 0.01 },
      )
      .to(squareRef6.current, { autoAlpha: 0.3, duration: 0.01 }, '+=0.15')
      .fromTo(
        squareRef5.current,
        { autoAlpha: 0.3 },
        { autoAlpha: 1, duration: 0.01 },
      )
      .to(squareRef5.current, { autoAlpha: 0.3, duration: 0.01 }, '+=0.15')
      .fromTo(
        squareRef3.current,
        { autoAlpha: 0.3 },
        { autoAlpha: 1, duration: 0.01 },
      )
      .to(squareRef3.current, { autoAlpha: 0.3, duration: 0.01 }, '+=0.15');
  }, []);

  return (
    <div className={styles.loaderGrid} ref={innerRef} data-testid="loading">
      <div ref={squareRef1} />
      <div ref={squareRef2} />
      <div ref={squareRef3} />
      <div ref={squareRef4} />
      <div ref={squareRef5} />
      <div ref={squareRef6} />
    </div>
  );
};

export default LoaderGrid;
