import React, { useState } from "react";
import API from "../../api";

const BlogCreateForm = ({ setBlogs, blogs }) => {
  const [formData, setFormData] = useState({
    title: "",
    img_url: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault(); // Prevents default form submission behavior

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("You must be logged in to create a blog.");
        setLoading(false);
        return;
      }

      const response = await API.post("/blog/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Blog created:", response.data);

      // Ensure blogs is an array before updating
      if (Array.isArray(blogs)) {
        setBlogs([response.data, ...blogs]);
      } else {
        setBlogs([response.data]); // Handle edge case where blogs might be undefined/null
      }

      // Reset form
      setFormData({ title: "", img_url: "", body: "" });

      setSuccess("Blog created successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
      setError(
        error.response?.data?.detail ||
          "Failed to create blog. Please try again."
      );
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>

      {/* ✅ Display error and success messages */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          aria-label="Blog Title"
        />
        <input
          type="text"
          name="img_url"
          placeholder="Image URL"
          value={formData.img_url}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          aria-label="Image URL"
        />
        <textarea
          name="body"
          placeholder="Write your blog post here..."
          value={formData.body}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          aria-label="Blog Content"
        ></textarea>
        <button
          type="submit"
          className={`w-full p-2 rounded text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BlogCreateForm;
