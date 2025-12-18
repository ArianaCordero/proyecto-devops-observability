// items.js
import { apiFetch } from "./client";

export const ItemsAPI = {
  list: () => apiFetch("/items"),
  get: (id) => apiFetch(`/items/${id}`),
  create: (payload) => apiFetch("/items", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) => apiFetch(`/items/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id) => apiFetch(`/items/${id}`, { method: "DELETE" }),
};
