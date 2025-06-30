import React, { useEffect, useState } from 'react';
import { getChannelMessages, sendMessage } from '../api/messaging';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import ThreadView from '../components/ThreadView'; // Assuming you have a ThreadView component
import socket from '../socket';

const ChannelView = ({channelId}) => {
//   const channelId = 101; // Hardcoded for now
  const userId = 2; // Hardcoded, baad me auth se aayega
  const [messages, setMessages] = useState([]);

  // console.log('ChannelView rendered with channelId:', messages);

  const fetchMessages = async () => {
    const data = await getChannelMessages(channelId);
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    socket.on('new_message', (data) => {
      if (data.channel_id === channelId) {
        // console.log('New message received:', data);
        fetchMessages();
      }
    });

    return () => {
      socket.off('new_message');
    };
  }, [channelId]);

  const handleSendMessage = async (payload) => {
    await sendMessage(payload);
    fetchMessages();
  };

  const [selectedThreadMessage, setSelectedThreadMessage] = useState(null);

  const handleMessageClick = (msg) => {
    // console.log('msg clicked:', msg);
    setSelectedThreadMessage(msg);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Channel: {channelId}</h2>

      {messages.map((msg) => (
        <>
        <div key={msg.id} onClick={() => handleMessageClick(msg)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
          <strong>User {msg.user_id}:</strong> {msg.content}
        </div>
              {selectedThreadMessage && selectedThreadMessage.id === msg.id && (
        <ThreadView
          parentMessage={selectedThreadMessage}
          onClose={() => setSelectedThreadMessage(null)}
        />
      )}
        </>
      ))}

      <MessageInput channelId={channelId} userId={1} onMessageSent={handleSendMessage} />


    </div>
  );
};

export default ChannelView;
