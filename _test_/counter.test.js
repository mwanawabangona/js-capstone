
const itemCounter = require('.counter');
describe ('Checks for item on the page', () =>{
    const result = itemCounter();
  
    test('Number of item is greater than or equal to zero', ()=>{
      expect(result).toBeGreaterThanOrEqual(0);
    });
  
    test('More than zero', ()=>{
      expect(result).toEqual(expect.any(Number));
    });
  });