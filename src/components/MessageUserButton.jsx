import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * A button component to initiate a direct message conversation with a user
 * 
 * @param {Object} props
 * @param {string} props.userId - The ID of the user to message
 * @param {string} props.variant - Style variant (primary/secondary)
 * @param {string} props.className - Additional CSS classes
 */
const MessageUserButton = ({ userId, variant = 'primary', className = '' }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleMessageClick = async () => {
    try {
      setLoading(true);
      
      // Get current user ID from localStorage
      const currentUserId = localStorage.getItem('userId');
      
      if (!currentUserId) {
        throw new Error('You need to be logged in to send messages');
      }

      console.log('Starting conversation between', currentUserId, 'and', userId);
      
      // First connect the user
      await connectUser(currentUserId);
      
      // Then create the channel with simple data
      const channel = await createDMChannel(currentUserId, userId);
      
      // Navigate to the chat
      navigate(`/messages/${channel.id}`);
    } catch (error) {
      console.error('Error creating conversation:', error);
      alert('Could not start conversation: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const baseStyles = "px-4 py-2 rounded-full font-medium focus:outline-none transition-colors";
  
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  return (
    <button
      onClick={handleMessageClick}
      disabled={loading}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Starting chat...' : 'Message'}
    </button>
  );
};

MessageUserButton.propTypes = {
  userId: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string
};

export default MessageUserButton; 