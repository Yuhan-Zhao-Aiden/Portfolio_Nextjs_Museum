import { jwtDecode } from 'jwt-decode';

export function setToken(token) {
  localStorage.setItem('access_token', token);
}

export function getToken() {
  try {
    return localStorage.getItem('access_token');
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export async function registerUser(user, password, password2) {
  const body = {
    userName: user,
    password,
    password2
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if (res.status === 200) {
      return true;
    } 
    return false;
  } catch (error) {
    console.log("Cannot create user");
    return false;
  }
}

export async function authenticateUser(userName, password) {
  const body = {
    userName,
    password
  }
  let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  if (res.status === 200) {
    res = await res.json();
    setToken(res.token);
    return true;
  }
  return false;
}
