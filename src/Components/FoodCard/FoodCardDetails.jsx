import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactRating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const FoodCardDetails = () => {
  const foodItem = useLoaderData();
  const { name, image, price, recipe, _id } = foodItem;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  // Fetch existing comments from the server when the component mounts
  useEffect(() => {
    fetch(`https://restaurant-server-sepia.vercel.app/comments/${_id}`) // Change to match server endpoint
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, [_id]);

  const handleReviewSubmit = () => {
    if (!newComment.trim() || rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Input",
        text: "Please provide a comment and select a rating before posting.",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to be logged in to post a comment.",
        confirmButtonText: "Login",
      }).then(() => navigate("/login", { state: { from: location } }));
      return;
    }

    const commentData = {
      foodId: _id,
      userId: user?.uid || "Anonymous",
      userName: user?.displayName || "Anonymous",
      userPhoto: user?.photoURL || "https://via.placeholder.com/40",
      comment: newComment,
      rating: rating,
      createdAt: new Date().toISOString(),
    };

    fetch("https://restaurant-server-sepia.vercel.app/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Review submitted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setComments([...comments, commentData]); // Add the new comment to the existing list
          setNewComment("");
          setRating(0);
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Submit Review",
            text: "Something went wrong. Please try again later.",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while submitting your review.",
          confirmButtonText: "OK",
        });
      });
  };

  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="container mx-auto my-10 mt-20">
      {/* Food details */}
      <div className="card lg:card-side bg-gradient-to-r from-blue-50 to-purple-50 shadow-2xl hover:shadow-3xl transition-shadow duration-300 ease-in-out rounded-lg">
        <figure className="overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full lg:w-1/2 transform hover:scale-105 transition-transform duration-300"
          />
        </figure>
        <div className="card-body p-8">
          <h2 className="card-title text-4xl font-bold text-purple-700">
            {name}
          </h2>
          <p className="text-lg mt-4 text-gray-700">{recipe}</p>
          <p className="text-2xl font-semibold mt-4 text-orange-600">
            Price: ${price}
          </p>
          <div className="card-actions justify-end mt-6">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-center font-semibold text-3xl my-5 text-gray-800">
          Our Customer Reviews and Comments
        </h1>
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="input input-bordered w-full"
            />
            <ReactRating
              initialRating={rating}
              emptySymbol={<FaRegStar className="text-gray-400 text-xl" />}
              fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
              onChange={(rate) => setRating(rate)}
            />
            <button
              onClick={handleReviewSubmit}
              className="btn btn-primary hover:bg-blue-700 transition duration-300"
            >
              Post
            </button>
          </div>
          <div className="mt-6">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 border-b border-gray-200 py-2"
                >
                  <img
                    src={comment.userPhoto}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{comment.userName}</p>
                    <p className="text-gray-700">{comment.comment}</p>
                    <ReactRating
                      initialRating={comment.rating}
                      emptySymbol={
                        <FaRegStar className="text-gray-400 text-sm" />
                      }
                      fullSymbol={
                        <FaStar className="text-yellow-500 text-sm" />
                      }
                      readonly
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCardDetails;
