import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostForm = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/post", form);
      toast.success("Post created successfully!");
      setForm({ title: "", description: "" });
      setTimeout(() => {
        navigate("/posts");
      }, 1000);
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter your post title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Write something amazing..."
              rows="5"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
