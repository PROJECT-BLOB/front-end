'use client';

import React from 'react';

import BasicMapAlpha from '@/app/maptest/BasicMapAlpha';

import AutoComplete from './AutoComplete';
import styles from './MapTest.module.scss';

export default function MapTest() {
  return (
    <div className={styles.body}>
      <h2>Map 페이지</h2>
      <AutoComplete />
      <BasicMapAlpha />

      <div className={styles['button-container']}>
        <button className={styles.button} type='button'>
          +
        </button>
        <button className={styles.button} type='button'>
          추가하기
        </button>
      </div>
    </div>
  );
}
