import { chapter01 } from './chapter01.js';
import { chapter02 } from './chapter02.js';
import { chapter03 } from './chapter03.js';
import { chapter04 } from './chapter04.js';
import { chapter05 } from './chapter05.js';
import { chapter06 } from './chapter06.js';
import { chapter07 } from './chapter07.js';
import { chapter08 } from './chapter08.js';
import { chapter09 } from './chapter09.js';
import { chapter10 } from './chapter10.js';
import { chapter11 } from './chapter11.js';
import { chapter12 } from './chapter12.js';

export const chapters = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter10,
  chapter11,
  chapter12
];

export function getChapterById(id) {
  const numericId = parseInt(id, 10);
  return chapters.find(ch => ch.id === numericId) || null;
}
