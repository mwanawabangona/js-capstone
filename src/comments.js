// CREATE COMMENT 
import fetch from 'cross-fetch';

const gameKey = 'SjWWLlLXTNY3iVbnr4wA';
const createNewComment = async (newObject) => {
    const appId = gameKey;
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json; Charset=UTF-8',
        },
        body: JSON.stringify(newObject)
    }).then((res) => res.text())
    .then((data) => (data === 'Created' || 'error'))
    .catch(() => 'error');
    return response;
}

const getTotalComments = async (movieId) => {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${gameKey}/comments?item_id=${movieId}`)
    .then((response) => response.json())
    .then((data) => data.length)
    .catch(() => 0);

    return response;
}

export {createNewComment, getTotalComments};