const addLikes = (likes,id) =>{
    const likedAlbum = likes.find((likeAlbum) => likeAlbum.item_id === id);
        if(!likedAlbum){
            return 0;
        }
       return likedAlbum.likes;
};


// export const displayPage = (list,ulCon, likes) => {
//     let innerCon = '';
//     list.forEach((element) => {
//         const {id,title,cover} = element;
//         const likesNum = addLikes(likes,id);
//         innerCon += `
//         <li id="${id}" class="cards">
//         <div class="album-image">
//         <img src="${cover}" alt="album ${title}">
//         </div>
//         <div class="likes">
//         <p data-add-like='${id}' class="likes-btn">
//         <i class="far fa-heart"></i>
//         </p>
//         <p>${likesNum} likes</p>
//         </div>
//         <button class="comment-btn">Comments</button>
//         </li>`
//     });
//     ulCon.innerHTML = innerCon;
// };