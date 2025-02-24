import React from 'react';
import User from '../components/User';
import '../components/User.css';

const UserPage = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      // Simulated API call
      setTimeout(() => {
        setUser({
          name: "John Doe",
          username: "johndoe",
          avatar: "https://via.placeholder.com/80",
          bio: "Just a developer sharing my thoughts.",
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