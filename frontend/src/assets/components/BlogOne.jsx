import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";

const BlogOne = () => {
  const { postId } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    API.get(`/blog/${postId}/`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
      });
  }, [postId]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      await API.post("/comments/", { blog: postId, comment });
      alert("Comment added successfully!");
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment.");
    }
  };

  if (!blog) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
      <img
        src={blog.img_url}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-md mt-4"
      />
      <p className="text-gray-700 mt-4">{blog.body}</p>

      <h3 className="text-2xl font-semibold text-gray-800 mt-6">Comments:</h3>
      <ul className="mt-3 space-y-2">
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-gray-100 p-3 rounded-md shadow-sm"
            >
              {comment.comment}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No comments yet</p>
        )}
      </ul>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Add a Comment</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogOne;
