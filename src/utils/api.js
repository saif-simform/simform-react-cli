import axios from "axios";
import Cookies from "js-cookie";

/*
    Best practice to store access-token and refresh-token is
    cookie not a local storage. 
    
    Here I've created request interceptors to intercept
    request and add token into request header from cookie.
    You can update this logic as well create response interceptors based on project requirements.
    
    I've added custom config called withoutAuth in axios instance
    withoutAuth config value will decide whether send a token in request or not.
    if API need token in header in that case yu don't have to pass withoutAuth config
    and it will work as expected.
    EX: 
    API.get('/users')
    API.post('/posts', { title: 'foo', body: 'bar', userId: 1 })
    
    When you don't need token in header at that time you've to pass withoutAuth true.
    EX: 
    API.get('/users', { withoutAuth: true})
    API.post('/posts', { title: 'foo', body: 'bar', userId: 1 }, { withoutAuth: true })
    */

const environment = import.meta.env;
export const API = axios.create({
  baseURL: environment.VITE_APP_BASE_URL,
  withoutAuth: false,
  headers: {
    "Content-Type": "application/json",
  },
  /*
      you can pass common config here.
      */
});

/**
 * If your backend has refresh and access token then to refresh the access token you can add logic to the below function
 * can save access token in memory and refresh token in cookie
 */
// Define a function to refresh the token
const refreshToken = async () => {
  try {
    const response = await API.post("/auth/refresh-token", {
      refreshToken: Cookies.get("refreshToken"), // Load the refreshToken from cookies or if https cookie then just make get request to your endpoint
    }, { withoutAuth: true });

    const newAccessToken = response.data.accessToken;
    Cookies.set("accessToken", newAccessToken, { path: "/" });
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

// A request interceptor to inject the access token into requests
API.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken"); // Load the access token from cookies or local storage

    if (!config.withoutAuth && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  },
);

// A response interceptor to handle token expiration and auto-refresh
API.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired, try to refresh the token
      const newAccessToken = await refreshToken();

      // Update the original request with the new access token
      const originalRequest = error.config;
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      // Retry the original request
      return axios(originalRequest);
    }

    return Promise.reject(error);
  },
);

//post type


//create post
export const createPost = (body) => API.post("/item/create", body);

//login
export const login = (data) => API.post('/auth/login', data)

//get posts
export const getPosts = async () => API.get("/api/posts").then((res) => res.data);