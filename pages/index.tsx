import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import slash from '../public/slash.svg';
import Image from 'next/image';
import { useState } from 'react';
import firstCourseImage from '../public/first-course.svg';
import secondCourseImage from '../public/second-course.svg';
import * as cheerio from 'cheerio';
import moment from 'moment';
import MenuItem from '../components/MenuItem';

export const getServerSideProps = async () => {
  const page = await fetch('http://www.bemsorozo.hu/heti_menu.htm');
  const html = await page.text();
  const $ = cheerio.load(html);

  const tableData: string[][] = [];

  const tableRows = $('tbody', 'table[class=MsoTableGrid]')
    .children()
    .toArray();
  tableRows.forEach((row) => {
    const rowData = $(row)
      .children()
      .toArray()
      .map((cell) => $(cell).children().first().text().trim());
    tableData.push(rowData);
  });

  return {
    props: {
      tableData,
    },
  };
};

interface HomeProps {
  tableData: string[][];
}
const Home: NextPage<HomeProps> = ({ tableData }) => {
  const [isDaily, setIsDaily] = useState(true);

  const dayDict = new Map([
    ['Monday', 'Hétfő'],
    ['Tuesday', 'Kedd'],
    ['Wednesday', 'Szerda'],
    ['Thursday', 'Csütörtök'],
    ['Friday', 'Péntek'],
    ['Saturday', 'Szombat'],
    ['Sunday', 'Vasárnap'],
  ]);

  const currentDay = 'Hétfő' ?? dayDict.get(moment().format('dddd')) ?? 'Hétfő';
  const currentColumnIndex = tableData[0].indexOf(currentDay.toUpperCase());
  const firstCourse = tableData[2][currentColumnIndex];
  const secondCourse = tableData[3][currentColumnIndex];

  return (
    <main className={styles.main}>
      <h2 className={styles.currentDay}>{currentDay}</h2>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${isDaily && styles.active}`}
          onClick={() => setIsDaily(true)}
        >
          Napi
        </button>
        <Image src={slash} alt="slash" />
        <button
          className={`${styles.button} ${!isDaily && styles.active}`}
          onClick={() => setIsDaily(false)}
        >
          Heti
        </button>
      </div>

      {isDaily ? (
        ['Szombat', 'Vasárnap'].includes(currentDay) ? (
          <p className={styles.errorMessage}>{'Nézz vissza hétfőn! :)'}</p>
        ) : (
          <div className={styles.foodContainer}>
            <MenuItem title={firstCourse} imageUrl={firstCourseImage} />
            <MenuItem title={secondCourse} imageUrl={secondCourseImage} />
          </div>
        )
      ) : (
        <h4>WIP</h4>
      )}
    </main>
  );
};

export default Home;
