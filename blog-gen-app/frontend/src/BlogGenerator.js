import React, { useState } from "react";
import axios from "axios";

const BlogGenerator = ({ savedBlogs, setSavedBlogs }) => {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const generateBlog = async () => {
    if (!prompt) return alert("Please enter a prompt");
    setLoading(true);
    setTitle("");
    setContent("");
    setSaved(false);

    try {
      const res = await axios.post("http://localhost:5000/api/blogs/generate", { prompt });
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.error(err);
      alert("Error generating blog");
    } finally {
      setLoading(false);
    }
  };

  const saveBlog = () => {
    if (!title || !content) return;

    // Add blog to saved list
    setSavedBlogs([...savedBlogs, { title, content }]);
    setSaved(true);

    // Refresh input and generated blog
    setPrompt("");
    setTitle("");
    setContent("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <textarea
        rows="4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter blog topic..."
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={generateBlog}
        disabled={loading}
        style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px", cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Generating..." : "Generate Blog"}
      </button>

      {content && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            background: "#fafafa",
          }}
        >
          <h2 style={{ marginBottom: "15px", color: "#333" }}>{title}</h2>
          <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{content}</p>
          <button
            onClick={saveBlog}
            disabled={saved}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              background: "#1f7a4c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: saved ? "not-allowed" : "pointer",
            }}
          >
            {saved ? "Blog Saved ✅" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogGenerator;
