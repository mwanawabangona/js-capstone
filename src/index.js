import './style.css';
import Storage from './storage';

const listContainer = document.getElementById('cards-c');
const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const appKey = 'uNvsOeXZeqiXKjfZf15O';

 const getLikes = async () => {
    const updateLike = await fetch(`${baseUrl}/${appKey}/likes/`, { method: 'GET' });
    const likes = await updateLike.text();
    return likes;
  };
  
 const postLikes = async (charId) => {
    await fetch(`${baseUrl}/${appKey}/likes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: `${charId}`,
      }),
    });
  };

//   const likesBtn = (buttons) =>{
//       buttons.forEach((btn)=>{
//           btn.addEventListener('click', async()=>{
//               console.log('Hi')
//               await postLikes(btn.dataset.addLike);
//               displayImg();
//           })
//       })
//   }


const addLikes= (likes, id) => {
    const likedChar = likes.find((char)=>char.item_id===id);
    if(!likedChar){
        return 1;
    }
    return likedChar.likes;
};

  

function displayImg() {
    fetch(`https://www.breakingbadapi.com/api/characters`)
    .then(response => response.json())
    .then(data => {
        data = data.slice(0,6);
        
        let innerCon = '';
        if(data){
            data.forEach(char => {
                const likesNum = addLikes( data ,char.char_id);
                innerCon += `
        <li id="${char.char_id}" class="cards">
        <div class="album-image">
        <img src="${char.img}" alt="album ${char.name}">
      
        </div>
        <div class="likes">
        <p class="char-name"> ${char.name}</p>
        <p id='${char.char_id}' class="likes-btn">
        <i class="far fa-heart"></i>
        </p>
        <p>${likesNum} likes</p>
        </div>
        <button class="comment-btn">Comments</button>
        </li>`;
            });
        }else {
            innerCon = 'Sorry';
        }
        listContainer.innerHTML = innerCon;
         });
}
// Item Counter
const itemCounter = () => {
    const cards = document.querySelectorAll('.cards');
        return cards.length;
};

const displayCount = () =>{
    let option = document.querySelector('.nav-list-item.all');
    const active = Storage.getItem('active');
    if(active) {
        option = document.querySelector(`nav-list-item.${active}`);
        Storage.setItem('active','');
    }
    const span =document.createElement('span');
    span.className = 'item-counter';
    span.innerHTML += `(${6})`;// Need to check
    option.style.color = '#000';
    option.appendChild(span);
};


window.onload = () =>{
    displayImg();
    displayCount();
}