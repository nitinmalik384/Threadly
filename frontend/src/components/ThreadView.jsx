import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageInput from './MessageInput';

const ThreadView = ({ parentMessage, onClose }) => {
  const [replies, setReplies] = useState([]);

  const fetchReplies = async () => {
    const res = await axios.get(`http://localhost:5002/api/messaging/thread/${parentMessage.id}`);
    setReplies(res.data);
  };

  useEffect(() => {
    fetchReplies();
  }, [parentMessage.id]);

  const handleReplySend = async (payload) => {
    // console.log('Sending reply:', payload, parentMessage);
    await axios.post('http://localhost:5002/api/messaging/send', payload);
    fetchReplies();
  };

  return (
    <div style={{ border: '1px solid gray', padding: '10px', marginTop: '20px' }}>
      <h4>Thread</h4>
      <p>{parentMessage.content}</p>

      <h5>Replies:</h5>
      {replies.map((reply) => (
        <div key={reply.id} style={{ marginLeft: '20px', marginBottom: '8px' }}>
          <strong>User {reply.user_id}:</strong> {reply.content} <br />
          <small>{new Date(reply.created_at).toLocaleString()}</small>
        </div>
      ))}

      <MessageInput
        channelId={parentMessage.channel_id}
        userId={1}  // Hardcoded, baad me Auth se aayega
        parentMessageId={parentMessage.id}
        onMessageSent={handleReplySend}
      />

      <button onClick={onClose} style={{ marginTop: '10px' }}>Close Thread</button>
    </div>
  );
};

export default ThreadView;
