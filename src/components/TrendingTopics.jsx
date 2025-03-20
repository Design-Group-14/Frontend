const TrendingTopics = () => {
  const trends = [
    { topic: "AI Agents", posts: "12.3K Posts" },
    { topic: "Web3", posts: "8.9K Posts" },
    { topic: "Machine Learning", posts: "15.4K Posts" },
    { topic: "Open Source", posts: "5.2K Posts" },
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Trending Topics</h2>
      <ul className="space-y-2">
        {trends.map((trend, index) => (
          <li key={index} className="flex justify-between text-gray-700 hover:text-blue-500 cursor-pointer">
            <span>#{trend.topic}</span>
            <span className="text-sm text-gray-500">{trend.posts}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingTopics;