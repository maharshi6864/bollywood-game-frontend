const protocol = window.location.protocol; // http: or https:
const hostname = window.location.hostname; // Dynamic hostname
const port = 8080; // Backend port (adjust if different)

// Dynamically create URLs
export const GLOBAL_URL = `${protocol}//${hostname}:${port}/`;
export const SOCKET_URL = `${protocol}//${hostname}:${port}/ws`;


