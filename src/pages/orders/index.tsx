import React from "react";
import BackButton from "../../components/base/BackButton";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const OrdersTable: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.checkout);

  if (!orders || orders.length === 0) {
    return <div className="text-center py-8 text-gray-500">No orders yet.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-softBg rounded-lg shadow-md overflow-hidden">
        {/* Table Header */}
        <thead>
          <tr className="bg-secondary text-black text-left text-sm font-medium">
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Payment</th>
            <th className="px-6 py-3">Payment Status</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Type Status</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 border border-gray-300 py-2">
                <div className="flex items-center">
                  <img
                    src={order.productImage}
                    alt="Product"
                    className="w-10 h-10 mr-3  object-contain rounded-lg"
                  />
                  <span className="text-gray-800">{order.product}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700 border border-gray-300">
                {order.payment}
              </td>
              <td className="px-6 py-4 border border-gray-300">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    order.paymentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-700 border border-gray-300">
                {order.type}
              </td>
              <td className="px-6 py-4 border border-gray-300">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    order.typeStatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.typeStatus === "Processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.typeStatus}
                </span>
              </td>
              <td className="px-6 py-4 font-medium border border-gray-300">
                ${order.total}
              </td>
              <td className="px-6 py-4 text-gray-700 border border-gray-300">
                {order.date}
              </td>
              <td className="px-6 py-4 border border-gray-300">
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  aria-label="Delete"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Example usage component
const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl text-center font-bold mb-6">Order History</h1>
        <OrdersTable />
      </div>
    </div>
  );
};

export default App;
