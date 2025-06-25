import axios from "axios";

const API_BASE = "http://localhost:5002/api/messaging";  // API Gateway ka URL hoga in future

export const getChannelMessages = async (channelId) => {
  const res = await axios.get(`${API_BASE}/channel/${channelId}`);
  return res.data;
};

export const sendMessage = async (payload) => {
  const res = await axios.post(`${API_BASE}/send`, payload);
  return res.data;
};

export const getChannels = async () => {
  const res = await axios.get(`${API_BASE}/channels`);
  return res.data;
};
