import React, { useEffect, useState } from 'react';
import { getChannels } from '../api/messaging';

const ChannelSidebar = ({ onChannelSelect, selectedChannel }) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const data = await getChannels();
      setChannels(data);
    };
    fetchChannels();
  }, []);

  return (
    <div style={{ borderRight: "1px solid #ccc", padding: "10px", width: "200px" }}>
      <h3>Channels</h3>
      {channels.map((ch) => (
        <div
          key={ch.id}
          onClick={() => onChannelSelect(ch.id)}
          style={{
            cursor: "pointer",
            fontWeight: selectedChannel === ch.id ? "bold" : "normal",
            marginBottom: "8px"
          }}
        >
          #{ch.name}
        </div>
      ))}
    </div>
  );
};

export default ChannelSidebar;
