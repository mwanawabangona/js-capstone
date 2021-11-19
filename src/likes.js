// import { update } from 'lodash';

const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const appKey = 'uNvsOeXZeqiXKjfZf15O';
// Get likes from API
const getLikes = async () => {
  const likes = await fetch(`${baseUrl}/${appKey}/likes/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return likes.json();
};
  // Post Likes to API
const postLikes = async (id) => {
  const res = await fetch(`${baseUrl}/${appKey}/likes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  }).then((data) => data.text())
    .then((result) => result)
    .catch(() => 'error');

  return res;
};

const displayLike = async () => {
  const likesData = await getLikes();

  const totalLikes = document.querySelectorAll('.likes-count');

  totalLikes.forEach((likes) => {
    const id = likes.getAttribute('data');

    likesData.forEach((item) => {
      if (item.item_id === id) likes.innerHTML = item.likes;
    });
  });
};

const addLikes = () => {
  const likeBtn = document.querySelectorAll('.likes-btn');
  likeBtn.forEach((heart) => {
    heart.addEventListener('click', (e) => {
      e.preventDefault();
      const id = heart.getAttribute('id');
      const currentLikes = parseInt(heart.innerText, 10);
      postLikes(id).then((res) => {
        if (res !== 'error') {
          if (!res.error) {
            heart.innerHTML = (currentLikes + 1);
          }
        }
      });
    });
  });
};

export { addLikes, displayLike };