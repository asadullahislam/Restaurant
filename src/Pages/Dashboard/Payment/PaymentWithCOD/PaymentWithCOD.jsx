import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentWithCOD = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice; // Get totalPrice from location.state

  // State to store form inputs
  const [formData, setFormData] = useState({
    totalPrice: 0, // Default value, will be updated in useEffect
    name: "",
    address: "",
    phone: "",
    city: "",
  });

  // Set totalPrice from location.state into formData when component loads
  useEffect(() => {
    if (totalPrice) {
      setFormData((prev) => ({
        ...prev,
        totalPrice,
      }));
    }
  }, [totalPrice]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call API to store data in the database
    try {
      const response = await fetch(
        "https://restaurant-server-sepia.vercel.app/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      if (response.ok) {
        toast.success(
          "Order has been placed successfully for Cash on Delivery!",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        // Reset the form while keeping totalPrice
        setFormData({
          totalPrice: formData.totalPrice,
          name: "",
          address: "",
          phone: "",
          city: "",
        });
      } else {
        toast.error(`Error: ${result.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error saving COD payment data:", error);
      toast.error("An error occurred while processing your request.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="my-5">
      <h1 className="text-center text-3xl font-semibold mb-4">
        Cash On Delivery
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Total Price (Read-Only) */}
        <div className="mb-4">
          <label
            htmlFor="totalPrice"
            className="block text-lg font-medium text-gray-700"
          >
            Total Price
          </label>
          <input
            type="number"
            id="totalPrice"
            name="totalPrice"
            value={formData.totalPrice}
            readOnly
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-lg font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-lg font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-lg font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Place Order (COD)
        </button>
      </form>
      {/* ToastContainer for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default PaymentWithCOD;
