'use client';

import ScrollWrapper from './landing/ScrollWrapper';
import Section1 from './landing/Section1';
import Section2 from './landing/Section2';
import Section3 from './landing/Section3';
import Section4 from './landing/Section4';
import styles from './LandingPage.module.scss';

const data = [
  { key: 'section1', value: <Section1 /> },
  { key: 'section2', value: <Section2 /> },
  { key: 'section3', value: <Section3 /> },
  { key: 'section4', value: <Section4 /> },
];

export default function ScrollAnimation() {
  return (
    <div className={styles.container}>
      {data.map((overview) => (
        <ScrollWrapper key={overview.key}>{overview.value}</ScrollWrapper>
      ))}
    </div>
  );
}
