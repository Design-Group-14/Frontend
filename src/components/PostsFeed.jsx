import PostCard from "./PostsCard"; // ✅ Correct import
import PropTypes from "prop-types"; 


const PostsFeed = ({ type = "friends" }) => {
  console.log("Rendering PostsFeed with type:", type);

  const allPosts = [
    {
      id: 1,
      title: "Weekend Vibes",
      content: "Excited for the weekend! 🎉",
      image_url: "https://cdn2.hubspot.net/hubfs/364394/blogs/Admit-A-Bull/images/blog-post/080618-the-importance-of-sleep-for-college-students/the-importance-of-sleep-for-college-students-index.jpg",
      location: "Dublin, Ireland",
      user: "Alice Johnson",
    },
    {
      id: 2,
      title: "Project Complete!",
      content: "Just finished my project! 💻",
      image_url: "https://www.universityofcalifornia.edu/sites/default/files/styles/article_default_banner/public/college_voting_faq_header.jpg?h=7eca08bd&itok=3bUKecU1",
      location: "San Francisco, USA",
      user: "Mark Lee",
    },
    {
      id: 3,
      title: "Sunset Bliss",
      content: "Beautiful sunset today! 🌅",
      image_url: "https://due.uci.edu/files/2017/08/uci_beach_august_nl.png",
      location: "Paris, France",
      user: "Sophia Wang",
    },
    {
      id: 4,
      title: "Game Night!",
      content: "Anyone up for a game night? 🎲",
      image_url: "https://www.usnews.com/object/image/00000190-3ba9-d6ee-a7ff-7fbb4cfe0000/gettyimages-1473712269.jpg?update-time=1718987895511&size=responsive640",
      location: "New York, USA",
      user: "John Doe",
    },
  ];

  const posts = type === "friends" ? allPosts.slice(0, 2) : allPosts;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

PostsFeed.propTypes = {
  type: PropTypes.string
};

export default PostsFeed;