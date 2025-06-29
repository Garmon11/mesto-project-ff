const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "eee36efd-5074-4ced-8b50-6fbb95c182a8",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const cardGet = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const profilePatch = (data) => {
  return new Promise((resolve) => {
    fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(data),
    }).then((res) => {
      setTimeout(() => {
        resolve(handleResponse(res));
      }, 1000);
    });
  });
};

export const profileGet = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const cardPost = (data) => {
  return new Promise((resolve) => {
    fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(data),
    }).then((res) => {
      setTimeout(() => {
        resolve(handleResponse(res));
      }, 1000);
    });
  });
};

export const cardDelete = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const putLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const avatarPatch = (link) => {
  return new Promise((resolve) => {
    fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ avatar: link }),
    }).then((res) => {
      setTimeout(() => {
        resolve(handleResponse(res));
      }, 1000);
    });
  });
};
