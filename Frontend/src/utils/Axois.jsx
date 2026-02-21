import axios from "axios";

const instance = axios.create({
    baseURL: "https://mern-stack-note-app-so6x.onrender.com",
    withCredentials: true
})

export default instance;