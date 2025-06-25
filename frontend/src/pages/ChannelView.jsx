import React, { useEffect, useState } from 'react';
import { getChannelMessages, sendMessage } from '../api/messaging';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

const ChannelView = () => {
  const channelId = 101; // Hardcoded for now
  const userId = 2; // Hardcoded, baad me auth se aayega
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const data = await getChannelMessages(channelId);
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSendMessage = async (payload) => {
    await sendMessage(payload);
    fetchMessages();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Channel: {channelId}</h2>
      <MessageList messages={messages} />
      <MessageInput channelId={channelId} userId={userId} onMessageSent={handleSendMessage} />
    </div>
  );
};

export default ChannelView;
