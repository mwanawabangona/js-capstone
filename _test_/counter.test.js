/**
 * @jest-environment jsdom
 */
import { itemCounter } from '../src/counter.js';

describe('Checks for item on the page', () => {
  const result = itemCounter();

  test('Number of item is greater than or equal to zero', () => {
    expect(result).toBeGreaterThanOrEqual(0);
  });

  test('More than zero', () => {
    expect(result).toEqual(expect.any(Number));
  });
});

describe('Checks for character card on the page', () => {
  test('one card', () => {
    document.body.innerHTML = '';
    const testCard = document.createElement('li');
    testCard.className = 'cards';
    document.body.append(testCard);
    const showCounter = itemCounter();

    expect(showCounter).toEqual(1);
  });

  test('four cards', () => {
    document.body.innerHTML = '';
    const testCard1 = document.createElement('li');
    testCard1.className = 'cards';
    document.body.append(testCard1);

    const testCard2 = document.createElement('li');
    testCard2.className = 'cards';
    document.body.append(testCard2);

    const testCard3 = document.createElement('li');
    testCard3.className = 'cards';
    document.body.append(testCard3);

    const testCard4 = document.createElement('li');
    testCard4.className = 'cards';
    document.body.append(testCard4);
    const showCounter = itemCounter();

    expect(showCounter).toEqual(4);
  });
});