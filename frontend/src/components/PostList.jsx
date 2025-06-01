import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/post");
        setPosts(res.data.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const toggleDescription = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">Latest Posts</h1>
          <hr className="w-24 h-1 bg-indigo-500 mx-auto mt-2" />
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => navigate("/add")}
              className="mt-4 flex items-center space-x-2 bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition"
            >
              <FiPlus size={20} />
              <span>Add Post</span>
            </button>
          </div>
        </div>
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700">
                No posts yet
              </h3>
              <p className="text-gray-500">Create your first post!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {post.title}
                </h2>

                {expandedPosts[post._id] && (
                  <p className="text-gray-600 mb-4">{post.description}</p>
                )}

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => toggleDescription(post._id)}
                      className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600"
                    >
                      {expandedPosts[post._id] ? "Hide" : "Read More"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;
