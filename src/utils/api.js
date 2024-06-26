import { checkResponse } from "./weatherApi";

export const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export function request(baseUrl, options) {
  return fetch(baseUrl, options).then(checkResponse);
}

export function getItems(token) {
  return fetch(`${baseUrl}/items`, {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function addItem({ name, weather, imageUrl }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

export function deleteItems(_id, token) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function addLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function removeLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
