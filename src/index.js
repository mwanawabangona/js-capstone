/* eslint-disable linebreak-style */
import './style.css';
import { createNewComment, getTotalComments } from './comments.js';

const mData = [];
const gameKey = 'SjWWLlLXTNY3iVbnr4wA';
const moviesEndPoint = 'https://www.breakingbadapi.com/api/characters';
const listContainer = document.getElementById('cards-c');
const popUp = document.getElementById('pop');

const displayComments = async (id) => {
  const commentSection = document.getElementById('show-comments');
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${gameKey}/comments?item_id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      commentSection.innerHTML = '';
      data.forEach((comment) => {
        if (comment.username !== '') {
          commentSection.innerHTML += `<li>${comment.creation_date}: ${comment.username}${comment.comment}</li>`;
        }
      });
    // eslint-disable-next-line no-return-assign
    }).catch(() => (commentSection.innerHTML = 'No comments have been added'));
};
const displayTotalComments = (movieId) => {
  const counterArea = popUp.querySelector('.total-comments');
  getTotalComments(movieId).then((res) => {
    if (res) {
      // eslint-disable-next-line no-return-assign
      return counterArea.innerText = res;
      // eslint-disable-next-line no-return-assign
    } return counterArea.innerText = '0';
  });
};

const ActivateAddNewComment = (movieId) => {
  popUp.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = popUp.querySelector('#name');
    const comment = popUp.querySelector('#comment');
    const commentData = {
      item_id: movieId,
      username: name.value,
      comment: comment.value,
    };
    createNewComment(commentData).then((res) => {
      if (res === true) {
        name.value = '';
        comment.value = '';
        displayComments(movieId);
        displayTotalComments(movieId);
      }
    });
  });
};

const getMovieInfo = async (movieId) => {
  const response = await fetch(`${moviesEndPoint}/${movieId}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => 'error');
  return response;
};

const displayCommentPopUp = (movieId) => {
  popUp.classList.remove('hidden');
  popUp.innerHTML = 'Fetching data...';
  getMovieInfo(movieId).then((res) => {
    if (typeof res === 'object') {
      const data = res[0];
      popUp.innerHTML = `
            <div class="popup-con">
                <i id="closePopUp" class="fas fa-times"></i>
                <div class="popup">
                    <img class="pop-up-img" id="img" src="${data.img}" alt="close-btn">
                </div>
                <div>   
                    <h2>Comments (<span class="total-comments"></span>)</h2>      
                    <ul id="show-comments">
                        fetching comments...
                    </ul>
                </div>
                    
                <form id="form" class="inputs">
                    <h2>Add Comment</h2><br>
                    <input type="hidden" name="movie_id" value="${movieId}">
                    <input id="name" type="text" placeholder="Your name" required><br>
                    <input id="comment" type="text" placeholder="comments" required>
                    <button id="sendBtn" type="submit">comment</button>
                </form>
            </div>
            `;
      displayComments(movieId);
      displayTotalComments(movieId);
      const closePopUpBtn = popUp.querySelector('#closePopUp');
      closePopUpBtn.addEventListener('click', () => {
        popUp.innerHTML = '';
        popUp.classList.remove('hidden');
        popUp.classList.add('hidden');
      });
      ActivateAddNewComment(movieId);
    } else {
      popUp.innerHTML = 'Something went wrong. Please try again later';
      setTimeout(() => {
        popUp.classList.remove('hidden');
        popUp.classList.add('hidden');
        popUp.innerHTML = '';
      }, 2000);
    }
  });
};
const listenToCommentsBtn = () => {
  const btns = document.querySelectorAll('.comment-btn');
  btns.forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const movieId = element.getAttribute('id');
      displayCommentPopUp(movieId);
    });
  });
};

const displayMovies = () => {
  fetch(`${moviesEndPoint}`)
    .then((response) => response.json())
    .then((data) => {
      data = data.slice(0, 6);
      let innerCon = '';
      if (data) {
        data.forEach((char, i) => {
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
                    <button value="${i}" class="comment-btn" id="${char.char_id}">Comments</button>
                    </li>`;
          mData.push(char);
        });
        document.getElementById('count-com').innerText = data.length;
      } else {
        innerCon = 'Sorry';
      }
      listContainer.innerHTML = innerCon;
      listenToCommentsBtn();
    });
};

window.onload = () => {
  displayMovies();
};
