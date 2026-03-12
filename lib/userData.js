import { getToken } from "./authenticate";

export async function addToFavourites(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    )
    if (res.status === 200) { return res.json(); }
    else return [];
  } catch (error) {
    return [];
  }
}

export async function removeFromFavourites(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    )
    if (res.status === 200) { return res.json(); }
    else return [];
  } catch (error) {
    return [];
  }
}

export async function getFavourites() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/favourites`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    )
    if (res.status === 200) { return res.json(); }
    else return [];
  } catch (error) {
    return [];
  }
}

export async function addToHistory(id) {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.status === 200 ? await res.json() : [];
  } catch (error) {
    return [];
  }
}

export async function removeFromHistory(id) {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/history/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.status === 200 ? await res.json() : [];
  } catch (error) {
    return [];
  }
}

export async function getHistory() {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/history`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.status === 200 ? await res.json() : [];
  } catch (error) {
    return [];
  }
}
