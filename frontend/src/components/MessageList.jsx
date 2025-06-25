import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id} style={{ marginBottom: "10px" }}>
          <strong>User {msg.user_id}:</strong> {msg.content} <br/>
          <small>{new Date(msg.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
