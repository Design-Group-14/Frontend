import React, { useState, useRef } from "react";
import { uploadImageToFirebase } from "../utils/uploadImage";
import { PlusCircle } from "lucide-react"; // ✅ icon

const PostBox = () => {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handlePost = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.email) {
        throw new Error("User is not authenticated or missing email.");
      }

      let imageUrl = null;

      if (imageFile) {
        try {
          setUploading(true);
          imageUrl = await uploadImageToFirebase(imageFile, setUploadProgress);
          console.log("Image uploaded to:", imageUrl);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          setError("Image upload failed. Please try again.");
          setUploading(false);
          return;
        }
        setUploading(false);
      }

      const response = await fetch("http://localhost:8000/api/posts/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || "Untitled Post",
          content: post,
          email: user.email,
          image_url: imageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      const data = await response.json();
      console.log("Post created successfully:", data);

      setPost("");
      setTitle("");
      setImageFile(null);
      setUploadProgress(0);
      setError("");
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.message || "Failed to create post");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">What's happening?</h2>

      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      <input
        type="text"
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Post title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* ✅ Textarea with Icon Upload Button */}
      <div className="relative mb-3">
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a post..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        <button
          type="button"
          onClick={handleIconClick}
          className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
        >
          <PlusCircle size={28} />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setImageFile(e.target.files[0])}
          className="hidden"
        />
      </div>

      {/* ✅ Image Preview */}
      {imageFile && (
        <div className="mb-3">
          <p className="text-sm text-gray-600">Image Preview:</p>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="max-w-full h-auto rounded border"
          />
        </div>
      )}

      {/* ✅ Progress Bar */}
      {uploading && uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {uploading && (
        <div className="text-sm text-gray-500 mb-2">Uploading image...</div>
      )}

      <button
        onClick={handlePost}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        disabled={uploading}
      >
        {uploading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default PostBox;
