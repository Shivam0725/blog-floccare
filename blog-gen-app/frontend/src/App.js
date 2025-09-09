import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import BlogGenerator from "./BlogGenerator";

function App() {
  const [showBlogGenerator, setShowBlogGenerator] = useState(false);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [viewBlog, setViewBlog] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Filter saved blogs based on search keyword
  const filteredBlogs = savedBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "280px", borderRight: "1px solid #ddd", padding: "20px" }}>
        <h3>Saved Blogs</h3>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
        <ul style={{ listStyle: "none", padding: 0, maxHeight: "80vh", overflowY: "auto" }}>
          {filteredBlogs.map((blog, index) => (
            <li
              key={index}
              onClick={() => setViewBlog(blog)}
              style={{ cursor: "pointer", padding: "8px 0", color: "#1f7a4c" }}
            >
              {blog.title}
            </li>
          ))}
          {filteredBlogs.length === 0 && <li style={{ color: "#999" }}>No blogs found</li>}
        </ul>
      </div>

      {/* Main content */}
      <div style={{ flex: 1 }}>
        <Navbar
          onAddBlog={() => {
            setShowBlogGenerator(true);
            setViewBlog(null);
          }}
        />

        {showBlogGenerator && !viewBlog && (
          <BlogGenerator savedBlogs={savedBlogs} setSavedBlogs={setSavedBlogs} />
        )}

        {!showBlogGenerator && !viewBlog && <Home />}

        {viewBlog && (
          <div style={{ padding: "20px" }}>
            <h2>{viewBlog.title}</h2>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{viewBlog.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
