import React, { useState } from 'react';

const MessageInput = ({ channelId, userId, onMessageSent }) => {
  const [content, setContent] = useState('');

  const handleSend = async () => {
    if (!content) return;

    await onMessageSent({
      user_id: userId,
      channel_id: channelId,
      content,
    });

    setContent('');
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "70%" }}
      />
      <button onClick={handleSend} style={{ marginLeft: "10px" }}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
