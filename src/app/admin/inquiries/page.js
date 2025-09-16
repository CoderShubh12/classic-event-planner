"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const STATUS_OPTIONS = ["new", "in progress", "closed"];

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
        const res = await fetch("/api/contact-us", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setInquiries(data.data);
        } else {
          setError(data.error || "Failed to fetch inquiries.");
        }
      } catch {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [router]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/contact-us/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) =>
            inq._id === id ? { ...inq, status: newStatus } : inq
          )
        );
      } else {
        alert(data.error || "Failed to update status");
      }
    } catch {
      alert("Failed to update status");
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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <Head>
        <title>View Inquiries</title>
      </Head>
      <div className="container mx-auto overflow-x-auto sm:overflow-visible">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">
          <h1 className="text-3xl font-bold mb-6">Inquiries</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {inquiries.length === 0 ? (
            <p className="text-gray-500">No inquiries found.</p>
          ) : (
            <table className="min-w-full border border-gray-300 border-collapse sm:table-fixed">
              <thead>
                <tr className="bg-indigo-100 text-left">
                  <th className="hidden sm:table-cell border border-gray-300 px-4 py-2 font-semibold text-indigo-900 w-1/6">
                    Name
                  </th>
                  <th className="hidden sm:table-cell border border-gray-300 px-4 py-2 font-semibold text-indigo-900 w-1/6">
                    Category
                  </th>
                  <th className="hidden sm:table-cell border border-gray-300 px-4 py-2 font-semibold text-indigo-900 w-1/6">
                    Mobile Number
                  </th>
                  <th className="border border-gray-300 px-4 py-2 font-semibold text-indigo-900 w-2/6">
                    Message
                  </th>
                  <th className="hidden sm:table-cell border border-gray-300 px-4 py-2 font-semibold text-indigo-900 w-1/12">
                    Status
                  </th>
                  <th className="hidden sm:table-cell border border-gray-300 px-4 py-2 font-semibold text-indigo-900 w-1/6">
                    Received On
                  </th>
                  <th className="border border-gray-300 px-4 py-2 font-semibold text-indigo-900 w-1/12">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr
                    key={inquiry._id}
                    className="even:bg-white odd:bg-indigo-50 border border-gray-300"
                  >
                    {/* Mobile view: show name and email as label-value */}
                    <td className="block sm:table-cell border border-gray-300 p-2 sm:px-4 sm:py-3">
                      <span className="sm:hidden font-semibold">Name: </span>
                      {inquiry.name}
                    </td>
                    <td className="block sm:table-cell border border-gray-300 p-2 sm:px-4 sm:py-3">
                      <span className="sm:hidden font-semibold">Email: </span>
                      {inquiry.category}
                    </td>
                    <td className="block sm:table-cell border border-gray-300 p-2 sm:px-4 sm:py-3">
                      <span className="sm:hidden font-semibold">
                        Mobile Number:{" "}
                      </span>
                      {inquiry.phone || "-"}
                    </td>
                    <td className="border border-gray-300 p-2 sm:px-4 sm:py-3 max-w-xs break-words">
                      <span className="sm:hidden font-semibold">Message: </span>
                      {inquiry.message}
                    </td>
                    <td className="hidden sm:table-cell border border-gray-300 px-4 py-3 font-semibold text-indigo-700 uppercase whitespace-nowrap">
                      {inquiry.status || "new"}
                    </td>
                    <td className="hidden sm:table-cell border border-gray-300 px-4 py-3 whitespace-nowrap text-gray-500 text-xs">
                      {new Date(
                        inquiry.createdAt || inquiry.date
                      ).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-2 sm:px-4 sm:py-3">
                      <select
                        aria-label={`Change status for ${inquiry.name}`}
                        value={inquiry.status || "new"}
                        onChange={(e) =>
                          updateStatus(inquiry._id, e.target.value)
                        }
                        className="w-full rounded border border-gray-400 px-2 py-1 font-semibold text-indigo-900"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiriesPage;
