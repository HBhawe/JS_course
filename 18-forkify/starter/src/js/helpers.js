/**
 * The function `getJSON` fetches data from a URL with a timeout feature to handle requests that take
 * too long.
 * @param s - The parameter `s` in the `timeout` function represents the number of seconds after which
 * the timeout should occur.
 * @returns The `getJSON` function is being exported, which is an asynchronous function that fetches
 * data from a specified URL. It uses `Promise.race` to race between the fetch request and a timeout
 * promise. If the fetch request resolves first, it parses the response as JSON and returns the data.
 * If the timeout promise resolves first, it throws an error indicating that the request took too long.
 */
// timeout
import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetch(fetchPro), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (error) {
    throw error;
  }
};
