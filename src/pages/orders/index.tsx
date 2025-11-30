import React, { useState } from "react";
import BackButton from "../../components/base/BackButton";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { addOrder } from "../../store/slices/checkoutSlice";

interface CustomerInfoFormProps {
  onSuccess: () => void;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { productInfo } = useSelector((state: RootState) => state.checkout);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      address: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Create order with customer info
      const orderData = {
        id: Date.now(),
        product: productInfo.productName || "Product",
        productImage: productInfo.productImage || "",
        payment: "Pay at Register",
        paymentStatus: "Pending" as const,
        type: "In-Store Pickup",
        typeStatus: "Processing" as const,
        total: (productInfo.price.currentPrice * productInfo.quantity).toFixed(2),
        date: new Date().toLocaleDateString(),
        customerInfo: formData,
      };
      
      dispatch(addOrder(orderData));
      alert("Order placed successfully! You can pay at the register.");
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen p-4">
      <BackButton />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6 mt-4">Customer Information</h1>
        <p className="text-center text-gray-600 mb-8">Please provide your details to complete the order</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="123 Main St, City, State, ZIP"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-gray-800">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span>Product:</span>
              <span>{productInfo.productName || "N/A"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Quantity:</span>
              <span>{productInfo.quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Size:</span>
              <span>{productInfo.size}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
              <span>Total:</span>
              <span>${(productInfo.price.currentPrice * productInfo.quantity).toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

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

const OrdersPage: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);
  const { orders } = useSelector((state: RootState) => state.checkout);
  
  // Show form if user just came from checkout (no orders yet or last order is pending)
  const shouldShowForm = !showHistory && (!orders || orders.length === 0 || 
    (orders.length > 0 && orders[orders.length - 1].paymentStatus === "Pending" && orders[orders.length - 1].payment === "Pay at Register" && !orders[orders.length - 1].customerInfo));
  
  return (
    <div className="min-h-screen p-4">
      {shouldShowForm ? (
        <CustomerInfoForm onSuccess={() => setShowHistory(true)} />
      ) : (
        <>
          <BackButton />
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-bold text-center mb-8 mt-4">Order History</h1>
            <OrdersTable />
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
