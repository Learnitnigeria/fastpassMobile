import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.8.100:3001",
  headers: {
    "Content-type": "application/json"
  }
});