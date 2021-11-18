/**
 * @jest-environment jsdom
 */
 import {itemCounter} from '../src/counter';

describe ('Checks for item on the page', () =>{
    const result = itemCounter();
  
    test('Number of item is greater than or equal to zero', ()=>{
      expect(result).toBeGreaterThanOrEqual(0);
    });
  
    test('More than zero', ()=>{
      expect(result).toEqual(expect.any(Number));
    });
  });


  describe ('Checks for character card on the page', () =>{
    const result = itemCounter();
  
    test('three cards', ()=>{

      document.body.innerHTML = '';
      const testCard = document.createElement('div');
      testCard.className = 'card-c'
      document.body.append(testCard);
      const showCounter = itemCounter();

      expect(showCounter).toEqual(3);
    });
  
    test('four cards', ()=>{

      document.body.innerHTML = '';
      const testCard = document.createElement('div');
      testCard.className = 'card-c'
      document.body.append(testCard);
      const showCounter = itemCounter();

      expect(showCounter).toEqual(4);
    });
  });