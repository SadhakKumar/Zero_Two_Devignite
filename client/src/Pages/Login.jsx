import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore, doc, getDoc } from "../firebase";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill in all fields");
      return;
    }

    setErrorMsg("");
    setSubmitButtonDisabled(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.pass
      );
      const user = userCredential.user;

      // Example: Fetch additional user data from Firestore
      const userQuery = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userQuery);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User Data:', userData);
      }

      setSubmitButtonDisabled(false);

      // Redirect to the desired page after successful login
      navigate('/'); // Change the path as needed

    } catch (err) {
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
      console.error(err);
    }
  };

  return (
    <div className="px-3 mx-auto mt-0 md:flex-0 shrink-0 w-100 lg:w-3/5">
      <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
          <h5>Login</h5>
        </div>

        <div className="flex-auto p-6">
          <form role="form text-left">
            <div className="mb-4">
              <input
                aria-describedby="email-addon"
                aria-label="Email"
                placeholder="Enter email address"
                value={values.email}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                type="email"
              />
            </div>
            <div className="mb-4">
              <input
                aria-describedby="password-addon"
                aria-label="Password"
                placeholder="Enter password"
                value={values.pass}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    pass: event.target.value,
                  }))
                }
                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                type="password"
              />
            </div>

            <div className="text-center">
              <button
                disabled={submitButtonDisabled}
                onClick={handleSubmission}
                className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                type="button"
              >
                Sign in
              </button>
            </div>
            <p className="mt-4 mb-0 leading-normal text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold text-slate-700">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;