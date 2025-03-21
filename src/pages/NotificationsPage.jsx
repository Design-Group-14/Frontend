import React, { useState, useEffect } from "react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulated unread message notifications
    setNotifications([
      { id: 1, type: "message", sender: "Alice Johnson", text: "has messaged you." },
      { id: 2, type: "message", sender: "John Smith", text: "has messaged you." },
    ]);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      <div className="bg-white p-4 rounded-lg shadow">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No notifications.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {notifications.map((notification) => (
              <li key={notification.id} className="p-3">
                <p className="text-gray-700 font-medium">
                  {notification.sender} <span className="text-gray-500">{notification.text}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
