import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/blog/")
      .then((response) => {
        console.log("Fetched Blogs:", response.data);
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Blogs
      </h1>
      {blogs.length === 0 ? (
        <p className="text-gray-600 text-center">No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
              <Link to={`/${blog.id}`}>{blog.title}</Link>
            </h2>
            <p className="text-gray-700 mt-2">{blog.body.slice(0, 100)}...</p>

            {blog.img_url && (
              <img
                src={blog.img_url}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            )}

            {/*<h3 className="text-lg font-semibold mt-4">Comments:</h3>
             <ul className="list-disc list-inside text-gray-600">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((comment) => (
                  <li key={comment.id} className="mt-2 text-gray-700">
                    {comment.comment}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </ul> */}
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
