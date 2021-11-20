import Storage from './storage.js';

const itemCounter = () => {
  const cards = document.querySelectorAll('.cards');
  return cards.length;
};

const displayCount = () => {
  let option = document.querySelector('.nav-list-item.all');
  const active = Storage.getItem('active');
  if (active) {
    option = document.querySelector(`nav-list-item.${active}`);
    Storage.setItem('active', '');
  }
  const span = document.createElement('span');
  span.className = 'item-counter';
  span.innerHTML += `(${itemCounter()})`;
  option.style.color = '#000';
  option.appendChild(span);
};

export { displayCount, itemCounter };