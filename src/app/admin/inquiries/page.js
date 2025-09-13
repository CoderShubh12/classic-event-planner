"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const InquiriesPage = () => {
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchInquiries = async () => {
      try {
        const res = await fetch("/api/inquiries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setInquiries(data.data);
        } else {
          setError(data.error || "Failed to fetch inquiries.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [router]);

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
        <title>View Inquiries</title>
      </Head>
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6">Inquiries</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {inquiries.length === 0 ? (
            <p className="text-gray-500">No inquiries found.</p>
          ) : (
            <ul className="space-y-4">
              {inquiries.map((inquiry) => (
                <li
                  key={inquiry._id}
                  className="bg-gray-50 p-6 rounded-lg shadow-md"
                >
                  <p className="text-lg font-semibold text-gray-800">
                    From: {inquiry.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {inquiry.email}
                  </p>
                  <p className="mt-2 text-gray-700">{inquiry.message}</p>
                  <p className="mt-2 text-xs text-gray-400">
                    Received on: {new Date(inquiry.date).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiriesPage;
