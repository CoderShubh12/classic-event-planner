"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const ManageTestimonials = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    clientName: "",
    text: "",
    rating: 5,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setFormSuccess("Testimonial added successfully!");
        setFormData({ clientName: "", text: "", rating: 5 });
      } else {
        setFormError(data.error || "Failed to add testimonial.");
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
        <title>Manage Testimonials</title>
      </Head>
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6">Add New Testimonial</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Testimonial Text</label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
                rows="4"
                className="w-full mt-1 p-2 border rounded-md"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
            >
              Add Testimonial
            </button>
          </form>
          {formError && <p className="mt-4 text-red-500">{formError}</p>}
          {formSuccess && <p className="mt-4 text-green-500">{formSuccess}</p>}
        </div>
      </div>
    </div>
  );
};

export default ManageTestimonials;
