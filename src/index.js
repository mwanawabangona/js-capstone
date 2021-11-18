import { forEach } from 'lodash';
import './style.css';
// import { displayPage } from './display';

const mData = []
var inFocus = null

const listContainer = document.getElementById('cards-c');
const name = document.getElementById('name')
const comment = document.getElementById('comment')
const sendBtn = document.getElementById('sendBtn')
const form = document.getElementById('form')
const popUp = document.getElementById('pop')


// CREATE COMMENT 
const createNewComment = async (newObject) => {
    const appId = 'PDeItw9GtAiSoybmtycm';

    await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json; Charset=UTF-8',
        },
        body: JSON.stringify(newObject)
    }).then((res) => {
        console.log(res);
    }).catch((error) => {
        throw new Error(error)
    })
}

const handleCommentForm = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const commentData = {
            item_id: inFocus,
            username: name.value,
            comment: comment.value
        }

        console.log(commentData);
        createNewComment(commentData)

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
                if (comment.username !== "") {
                    const template = document.createElement('template')
                    template.innerHTML = `<li>user: ${comment.username}${comment.comment}</li>`
                    commentSection.appendChild(template.content.firstChild)
                }
            });

            console.log(data.length);
        })
}

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

                    // handleCommentForm(char.char_id)
                    mData.push(char)
                });
                document.getElementById('count-com').innerText=data.length
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
                const character = mData[parseInt(e.target.value)]
                inFocus = character.char_id
                popUp.classList.remove('hidden');
                const img = document.getElementById('img')
                img.src = character.img
                fetchComments(character.char_id)
            });
        });

        handleCommentForm()

        close.addEventListener('click', () => {
            popUp.classList.add('hidden');
        })
    });
}
