import { io } from "socket.io-client";

const socket = io("http://localhost:5002");  // Flask messaging service port

export default socket;
