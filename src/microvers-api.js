const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appKey = 'uNvsOeXZeqiXKjfZf15O';

export const getLikes = async() => {
    const totalLikes = await fetch(`${baseUrl}apps/${appKey}/likes/`,
    {
        method:'GET'
    });
    const likesNum = await totalLikes.text();
    return likesNum;
}

export const postLikes = async(albumId) => {
 await fetch(`${baseUrl}apps/${appKey}/likes/`,
 {
     method:'POST',
     headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        item_id:`${albumId}`,
        }),
  
    });
};