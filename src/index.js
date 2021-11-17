import './style.css';
// import { displayPage } from './display';

const listContainer = document.getElementById('cards-c');





function displayImg() {
    fetch(`https://www.breakingbadapi.com/api/characters`)
    .then(response => response.json())
    .then(data => {
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
        <p data-add-like='${char.char_id}' class="likes-btn">
        <i class="far fa-heart">Likes 0</i>
        </p>
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




window.onload = () =>{
    displayImg();
}