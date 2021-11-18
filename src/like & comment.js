const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const appKey = 'uNvsOeXZeqiXKjfZf15O';

export const getLikes = async () => {
    const updateLike = await fetch(`${baseUrl}/${appKey}/likes/`, { method: 'GET' });
    const likes = await updateLike.text();
    return likes;
  };
  
  export const postLikes = async (charId) => {
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

 