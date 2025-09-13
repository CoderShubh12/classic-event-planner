"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const ManagePortfolio = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [{ url: "", alt: "" }],
    date: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, e) => {
    const newImages = [...formData.images];
    newImages[index][e.target.name] = e.target.value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, { url: "", alt: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setFormSuccess("Portfolio item added successfully!");
        setFormData({
          title: "",
          description: "",
          images: [{ url: "", alt: "" }],
          date: "",
        });
      } else {
        setFormError(data.error || "Failed to add portfolio item.");
      }
    } catch (err) {
      setFormError("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Head>
        <title>Manage Portfolio</title>
      </Head>
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6">Add New Portfolio Item</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full mt-1 p-2 border rounded-md"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Images</h3>
              {formData.images.map((image, index) => (
                <div key={index} className="flex space-x-4 mb-4">
                  <input
                    type="url"
                    name="url"
                    value={image.url}
                    onChange={(e) => handleImageChange(index, e)}
                    placeholder="Image URL"
                    className="w-2/3 p-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="alt"
                    value={image.alt}
                    onChange={(e) => handleImageChange(index, e)}
                    placeholder="Image Alt Text"
                    className="w-1/3 p-2 border rounded-md"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="mt-2 py-1 px-3 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Add another image
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
            >
              Add Portfolio Item
            </button>
          </form>
          {formError && <p className="mt-4 text-red-500">{formError}</p>}
          {formSuccess && <p className="mt-4 text-green-500">{formSuccess}</p>}
        </div>
      </div>
    </div>
  );
};

export default ManagePortfolio;
