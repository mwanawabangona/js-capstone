export const displayPage = (list,ulCon, likes) => {
    let innerCon = '';
    list.forEach((element) => {
        const {id,title,album} = element;
        const likesNum = addLikes(likes,id);
        innerCon += `
        <li id="${id}" class="cards">
        <div class="album-image">
        <img src="${album}" alt="album ${title}">
        </div>
        <div class="likes">
        <p data-add-like='${id}' class="likes-btn">
        <i class="far fa-heart"></i>
        </p>
        <p>${likesNum} likes</p>
        </div>
        <p class="comment-btn">Comments</p>
        </li>`
    });
    ulCon.innerHTML = innerCon;
};