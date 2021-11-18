import './style.css';
import  displayCount  from './counter';
import {addLikes,displayLike} from './likes';

const listContainer = document.getElementById('cards-c');

  

function displayImg() {
    fetch(`https://www.breakingbadapi.com/api/characters`)
    .then(response => response.json())
    .then(data => {
        data = data.slice(0,6);
        
        let innerCon = '';
        if(data){
            data.forEach(char => {
                innerCon += `
        <li id="${char.char_id}" class="cards">
        <div class="album-image">
        <img src="${char.img}" alt="album ${char.name}">
      
        </div>
        <div class="likes">
        <p class="char-name"> ${char.name}</p>
        <p id='${char.char_id}' class="likes-btn">
        <i class="far fa-heart"></i> <span class= "likes-count" data="${char.char_id}"></span>Likes
        </p>
       
        </div>
        <button class="comment-btn">Comments</button>
        </li>`;
            });
        }else {
            innerCon = 'Sorry';
        }
        listContainer.innerHTML = innerCon;
        addLikes();
        displayLike();
        displayCount();
         });
}

window.onload = () =>{
    displayImg();
  
}