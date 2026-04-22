import axios from "axios";

const ENV = "https://jsonplaceholder.typicode.com/"; 

export const getPosts = () => axios.get(ENV + "posts");
export const getPostDetail = (id: number) => axios.get(ENV + "posts/" + id);
export const getUserDetail = (id: number) => axios.get(ENV + "users/" + id);

export const postData = (data: { title: string; body: string; userId: number }) => {
  return axios.post(ENV + "posts", data);
};

export const getPostComments = (id: number) => axios.get(`${ENV}posts/${id}/comments`);