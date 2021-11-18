import { forEach } from 'lodash';
import './style.css';
// import { displayPage } from './display';

const mData = []

const listContainer = document.getElementById('cards-c');
const name = document.getElementById('name')
const comment = document.getElementById('comment')
const sendBtn = document.getElementById('sendBtn')
const form = document.getElementById('form')
const popUp = document.getElementById('pop')


// CREATE COMMENT 
const createNewComment = async (newObject, itemId = null) => {
    const appId = 'PDeItw9GtAiSoybmtycm';
    await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json; Charset=UTF-8',
        },
        body: JSON.stringify(newObject)
    })
        .catch((error) => {
            throw new Error(error)
        })
}

const handleCommentForm = (id) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const commentData = {
            item_id: id,
            username: name.value,
            comment: comment.value
        }

        createNewComment(commentData, id)
        name.value = ''
        comment.value = ''

    })
}

const fetchComments = async (id) => {
    await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/PDeItw9GtAiSoybmtycm/comments?item_id=${id}`)
        .then((response) => response.json())
        .then((data) => {
            const commentSection = document.getElementById('show-comments')
            commentSection.innerHTML = ""

            data.forEach(comment => {
                console.log(comment);
                const template = document.createElement('template')
                template.innerHTML = `<li>user: ${comment.username}${comment.comment}</li>`
                commentSection.appendChild(template.content.firstChild)
            });
        })
}

fetchComments(2)


const closePopup = () => {
    closePopup.addEventListener('click', (e) => {
        e.preventDefault();
        popUp.classList.add('hidden')
    })
}

function display(callback, closePopup) {
    fetch(`https://www.breakingbadapi.com/api/characters`)
        .then(response => response.json())
        .then(data => {
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

                    handleCommentForm(char.char_id)
                    mData.push(char)
                });
            } else {
                innerCon = 'Sorry';
            }

            listContainer.innerHTML = innerCon;
            const close = document.getElementById('close')
            close.addEventListener('click', () => {
                popUp.classList.remove('d-flex')
            })

            callback()

        });
}

window.onload = () => {
    display(() => {
        const close = document.getElementById('close')

        const btns = document.querySelectorAll('.comment-btn');
        btns.forEach((element, index) => {
            element.addEventListener("click", (e) => {
                const char = mData[parseInt(e.target.value)]
                console.log(char);
                popUp.classList.remove('hidden');
                const img = document.getElementById('img')
                img.src = char.img
                fetchComments(char.char_id)
            });
        });

        
            close.addEventListener('click', () => {
                popUp.classList.add('hidden');
            })


    });
    
}