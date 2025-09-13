"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const AdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // useEffect runs after the component has mounted on the client
  useEffect(() => {
    // Check for the authentication token
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token is found, redirect to the login page
      router.push("/admin-login");
    } else {
      // You can add a token validation check here if needed
      setLoading(false);
    }
  }, [router]);

  // Show a loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  // Render the dashboard content once authenticated
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome to your dashboard. From here, you can manage all website
            content.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Manage Portfolio
              </h2>
              <p className="text-gray-500 mb-4">
                Add, edit, or delete wedding portfolios.
              </p>
              <button
                onClick={() => router.push("/admin/manage-portfolio")}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Go to Portfolio
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Manage Testimonials
              </h2>
              <p className="text-gray-500 mb-4">
                Add, edit, or delete client testimonials.
              </p>
              <button
                onClick={() => router.push("/admin/manage-testimonials")}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Go to Testimonials
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                View Inquiries
              </h2>
              <p className="text-gray-500 mb-4">
                Review contact form submissions.
              </p>
              <button
                onClick={() => router.push("/admin/inquiries")}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Go to Inquiries
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
