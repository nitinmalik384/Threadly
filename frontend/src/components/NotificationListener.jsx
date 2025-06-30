import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5003');  // Docker me run kar raha to host ka dhyan dena (use correct IP if needed)

const NotificationListener = () => {
  const [notifications, setNotifications] = React.useState([]);
  useEffect(() => {
    socket.on('new_notification', (data) => {
      console.log('📣 New Notification:', data);
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off('new_notification');
    };
  }, []);

  return <div style={{ border: "1px solid #ddd", padding: "10px", maxWidth: "300px" }}>
  <h3>🔔 Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications yet...</p>
      ) : (
        notifications.map((n, index) => (
          <div key={index} style={{ marginBottom: "8px", padding: "5px", background: "#f9f9f9" }}>
            📢 {n.content}
          </div>
        ))
      )}
    </div>;


};

export default NotificationListener;





// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const NotificationListener = () => {
//   const [notifications, setNotifications] = useState([]);
//   const socket = io("http://localhost:5003");  // Flask notification service ka port

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("✅ Connected to Notification WebSocket");
//     });

//     socket.on("new_notification", (data) => {
//       console.log("📥 New Notification Received:", data);
//       setNotifications((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div style={{ border: "1px solid #ddd", padding: "10px", maxWidth: "300px" }}>
//       <h3>🔔 Notifications</h3>
//       {notifications.length === 0 ? (
//         <p>No notifications yet...</p>
//       ) : (
//         notifications.map((n, index) => (
//           <div key={index} style={{ marginBottom: "8px", padding: "5px", background: "#f9f9f9" }}>
//             📢 {n.content}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };



