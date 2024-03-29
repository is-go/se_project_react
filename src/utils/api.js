import { checkResponse } from "./weatherApi";

const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export function request(baseUrl, options) {
  return fetch(baseUrl, options).then(checkResponse);
}

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  }).then(checkResponse);
}

export function addItem({ name, weather, link }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, link, weather }),
  }).then(checkResponse);
}

export function deleteItems(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponse);
}
