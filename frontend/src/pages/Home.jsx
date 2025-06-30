import React, { useState } from 'react';
import ChannelSidebar from '../components/ChannelSidebar';
import ChannelView from './ChannelView';

function Home() {
  const [selectedChannel, setSelectedChannel] = useState(null);
  // console.log("selectedChannel: ", selectedChannel);

  return (
    <div style={{ display: "flex" }}>
      <ChannelSidebar
        onChannelSelect={setSelectedChannel}
        selectedChannel={selectedChannel}
      />
      <div style={{ padding: "20px" }}>
        {selectedChannel ? (
          <ChannelView channelId={selectedChannel} />
        ) : (
          <p>Please select a channel</p>
        )}
      </div>
    </div>
  );
}

export default Home;
