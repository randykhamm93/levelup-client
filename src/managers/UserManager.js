export const getGamerByUserId = (userId) => {
  return fetch(`http://localhost:8000/gamers/by_user?user_id=${userId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
};
