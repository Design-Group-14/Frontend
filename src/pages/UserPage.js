import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from '../components/User';
import '../components/User.css';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const { username } = useParams(); // Get username from URL
  
    useEffect(() => {
      // Simulated API call
      setTimeout(() => {
        setUser({
          name: "John Doe",
          username: "DohnJoe",
          avatar: "https://via.placeholder.com/80",
          bio: "4th Year CompSci.",
          posts: [
            { id: 1, content: "Hello world! First post!", date: "Feb 24, 2025" },
            { id: 2, content: "React is awesome!", date: "Feb 23, 2025" },
          ],
        });
      }, 1000);
    }, []);
  
    return (
      <div>
        <User user={user} />
      </div>
    );
  };
  
  export default UserPage;