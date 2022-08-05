import axios from "axios";
import { apiBaseURL } from "../config";

const addPost = async (currentData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${apiBaseURL}/social-media/add-new`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(currentData),
    });
    return [true, response?.data?.message];
  } catch (error) {
    return [false, error?.response?.data];
  }
};

const GetAllPosts = async (filter) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${apiBaseURL}/social-media/get-all`,
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(filter),
    });
    return [true, response?.data?.results];
  } catch (error) {
    return [false, error?.response?.data];
  }
};
const GetAllUsers = async () => {
  try {
    let response = await axios({
      method: "POST",
      url: `${apiBaseURL}/social-media/get-all-users`,
      headers: {
        "content-type": "application/json",
      },
    });
    return [true, response?.data?.results];
  } catch (error) {
    return [false, error?.response?.data];
  }
};
const addNewComment = async (id, currentData) => {
  try {
    let response = await axios({
      method: "PUT",
      url: `${apiBaseURL}/social-media/add-new-comment/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(currentData),
    });
    return [true, response?.data?.message];
  } catch (error) {
    return [false, error?.response?.data];
  }
};
const addNewUpVote = async (id, currentData) => {
  try {
    let response = await axios({
      method: "PUT",
      url: `${apiBaseURL}/social-media/add-upvote/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(currentData),
    });
    return [true, response?.data?.message];
  } catch (error) {
    return [false, error?.response?.data];
  }
};
const addNewDownVote = async (id, currentData) => {
  try {
    let response = await axios({
      method: "PUT",
      url: `${apiBaseURL}/social-media/add-downvote/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(currentData),
    });
    return [true, response?.data?.message];
  } catch (error) {
    return [false, error?.response?.data];
  }
};

const registerNewUser = async (currentData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${apiBaseURL}/social-media/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(currentData),
    });
    console.log(response?.data);
    return [true, response?.data];
  } catch (error) {
    console.log(error?.response);
    return [false, error?.response?.data];
  }
};
const loginUser = async (currentData) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${apiBaseURL}/social-media/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(currentData),
    });
    return [true, response?.data];
  } catch (error) {
    return [false, error?.response?.data?.message];
  }
};

export {
  addPost,
  GetAllPosts,
  addNewComment,
  addNewUpVote,
  addNewDownVote,
  registerNewUser,
  loginUser,
  GetAllUsers,
};
