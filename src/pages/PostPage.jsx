import { useParams } from "react-router-dom";
import PostCard from "../components/PostsCard";

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

const PostPage = () => {
  const { id } = useParams();
  const post = allPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <div className="text-center text-red-500 text-xl mt-20">Post not found</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <PostCard post={post} />
    </div>
  );
};

export default PostPage;