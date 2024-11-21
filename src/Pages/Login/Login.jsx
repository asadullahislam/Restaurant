// import { useContext, useEffect, useState } from "react";
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
//   validateCaptcha,
// } from "react-simple-captcha";
// import { AuthContext } from "../../Providers/AuthProvider";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";
// import SocialLogin from "../../Components/SocialLogin/SocialLogin";
// import authentication from "../../assets/others/authentication.gif";

// const Login = () => {
//   //
//   // .............. For Captcha .................
//   //

//   const [disabled, setDisabled] = useState(true);

//   const { signIn } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || "/";
//   console.log("state in the location ", location.state);
//   // for load captcha...........
//   useEffect(() => {
//     loadCaptchaEnginge(6);
//   }, []);

//   const handleLogin = (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const email = form.email.value;
//     const password = form.password.value;
//     console.log(email, password);
//     signIn(email, password).then((result) => {
//       const user = result.user;
//       console.log(user);
//       Swal.fire({
//         title: "User Login Successfull.",
//         showClass: {
//           popup: `
//                         animate__animated
//                         animate__fadeInUp
//                         animate__faster
//                       `,
//         },
//         hideClass: {
//           popup: `
//                         animate__animated
//                         animate__fadeOutDown
//                         animate__faster
//                       `,
//         },
//       });
//       navigate(from, { replace: true });
//     });
//   };

//   const handleValidateCaptcha = (e) => {
//     const user_captcha_value = e.target.value;
//     if (validateCaptcha(user_captcha_value)) {
//       setDisabled(false);
//     } else {
//       setDisabled(true);
//     }
//   };
//   //
//   //.......................................
//   //

//   return (
//     <>
//       <Helmet>
//         <title> Login</title>
//       </Helmet>
//       <div className="hero min-h-screen bg-base-200">
//         <div className="hero-content flex-col lg:flex-row-reverse">
//           <div className="text-center md:w-1/2 lg:text-left">
//             <h1 className="text-5xl m-10 font-bold">Login now!</h1>
//             <img
//               className="rounded-lg shadow-2xl"
//               src={authentication}
//               alt=""
//             />
//           </div>
//           <div className="card md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
//             <form onSubmit={handleLogin} className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="email"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="password"
//                   className="input input-bordered"
//                   required
//                 />
//                 <label className="label">
//                   <a href="#" className="label-text-alt link link-hover">
//                     Forgot password?
//                   </a>
//                 </label>
//               </div>

//               <div className="form-control">
//                 <label className="label">
//                   <LoadCanvasTemplate />
//                 </label>
//                 <input
//                   type="text"
//                   onBlur={handleValidateCaptcha}
//                   name="captcha"
//                   placeholder="type the captcha above"
//                   className="input input-bordered"
//                   required
//                 />
//               </div>

//               <input
//                 type="Submit"
//                 disabled={disabled}
//                 className="btn btn-primary"
//                 value="Login"
//               />
//               <p className="px-6">
//                 <small>
//                   New Here?{" "}
//                   <Link to="/signup" className="underline text-xl font-bold">
//                     Create an account
//                   </Link>
//                 </small>
//               </p>
//             </form>
//             <SocialLogin></SocialLogin>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import authentication from "../../assets/others/authentication.gif";

const Login = () => {
  //
  // .............. For Captcha .................
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // for load captcha...........
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password).then((result) => {
      const user = result.user;
      Swal.fire({
        title: "User Login Successfull.",
        showClass: {
          popup: `animate__animated animate__fadeInUp animate__faster`,
        },
        hideClass: {
          popup: `animate__animated animate__fadeOutDown animate__faster`,
        },
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <Helmet>
        <title> Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-blue-100">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
              Welcome Back!
            </h1>
            <img
              className="rounded-lg shadow-2xl max-w-full h-auto"
              src={authentication}
              alt="authentication"
            />
          </div>
          <div className="card w-full max-w-md bg-white shadow-2xl rounded-lg p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full p-3 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-medium">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full p-3 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  onBlur={handleValidateCaptcha}
                  name="captcha"
                  placeholder="Type the captcha above"
                  className="input input-bordered w-full p-3 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <input
                type="submit"
                disabled={disabled}
                className={`btn w-full p-3 rounded-lg ${
                  disabled ? "bg-gray-400" : "bg-blue-600"
                } text-white`}
                value="Login"
              />

              <p className="text-center">
                <small>
                  New Here?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-500 font-bold hover:underline"
                  >
                    Create an account
                  </Link>
                </small>
              </p>
            </form>

            <div className="divider">OR</div>
            <div className="text-center ">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
