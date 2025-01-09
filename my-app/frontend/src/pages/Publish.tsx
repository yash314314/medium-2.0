import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import AppBar from "../components/Appbar";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import Axios
import { BACKEND_URL } from "../config";

export function Publish() {
  const contentEditorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState({}); // Store content as plain text
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const EDITOR_JS_TOOLS = {
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: "Enter a header",
        levels: [1 ,2, 3, 4],
        defaultLevel:1,
      },
    },
    
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: "Enter a quote",
        captionPlaceholder: "Quote's author",
      },
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    image: {
      class: ImageTool,
      config: {
        uploader: {
          uploadByFile: async (file) => {
            try {
              const reader = new FileReader();
              return new Promise((resolve, reject) => {
                reader.onload = () =>
                  resolve({
                    success: 1,
                    file: { url: reader.result },
                  });
                reader.onerror = reject;
                reader.readAsDataURL(file);
              });
            } catch (error) {
              console.error("Image upload failed:", error);
              return { success: 0, file: { url: "" } };
            }
          },
          uploadByUrl: async (url) => ({
            success: 1,
            file: { url },
          }),
        },
      },
    },
  };

  useEffect(() => {
    if (!contentEditorRef.current) {
      contentEditorRef.current = new EditorJS({
        holder: "content-editor",
        tools: EDITOR_JS_TOOLS,
        placeholder: "Start writing your content...",
        autofocus: false,
        onChange: async () => {
          const savedContent = await contentEditorRef.current.save();
          
          setContent(savedContent);
        },
      });
    }
    return () => {
      const cleanup = async () => {
        if (contentEditorRef.current) {
          await contentEditorRef.current.destroy();
          contentEditorRef.current = null;
        }
      };
      cleanup();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title,
        content,
      };
  
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
        title: formData.title,
        content: formData.content,
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      
      console.log("Form submitted with title:", title);
      console.log("Form submitted with content:", content);
      console.log("res : ", response.data.id);

     navigate(`/blog/${response.data.id}`);  // Navigate on success
    } catch (error) {
      console.error("Saving failed:", error);
    }
  };

  return (
    <div className="p-3 bg-gradient-to-br from-indigo-400 to-pink-400 min-h-screen animate-fadeIn">
      <AppBar></AppBar>
  <div className="max-w-4xl mx-auto p-8 bg-white/30 backdrop-blur-sm rounded-lg shadow-lg animate-slideUp m-5">
    <h1 className="text-3xl font-bold mb-8 text-white animate-scaleIn">
      Create a New Blog Post
    </h1>
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="animate-fadeInRight">
        <label className="block text-lg font-bold text-white mb-2">
          Blog Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          className="mt-2 p-3 block w-full border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter the blog title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="animate-fadeInRight delay-100">
        <label
          htmlFor="category"
          className="block text-lg font-bold text-white"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 block w-full p-3 border border-gray-300 bg-white rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Category</option>
          <option value="tech">Technology</option>
          <option value="life">Lifestyle</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div className="animate-fadeInRight delay-200">
        <label className="block text-lg font-bold text-white mb-2">
          Content
        </label>
        <div
          id="content-editor"
          className="mt-2 p-3 block w-full text-white border border-gray-300 rounded-xl min-h-[400px] shadow-sm focus-within:ring-2"
        />
      </div>

      <div className="flex justify-end mt-6 animate-scaleIn delay-300">
        <button
          type="submit"
          className="px-6 py-2 text-purple-400 bg-white font-bold rounded-md hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Publish Blog
        </button>
      </div>
    </form>
  </div>
</div>
 );
}