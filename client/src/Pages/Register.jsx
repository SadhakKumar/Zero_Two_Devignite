import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import {auth, firestore, setDoc, doc, addDoc } from "../firebase"; // Assuming you have the firestore instance

function Signup() {
//   const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    model: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass || !values.model) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        // console.log(res)
        const user = res.user;

        // await updateProfile(user, {
        //   displayName: values.name,
        // });
        
        const userCollection ="users";

        // Use the respective collection reference
        const userRef = doc(firestore, userCollection, user.uid);

        // console.log(userRef);

        // Set user data in Firestore
        const userData = {
          displayName: values.name,
          email: values.email,
          model: values.model,
        };
        console.log(userData);
        await addDoc(userRef, userData);
        console.log("after setdoc");

        // await firestore.collection('users').doc(userCredential.user.uid).set({
        //     displayName: values.name,
        //     email: values.email,
        //     model: values.model,
        //     // You can add additional fields as needed
        //   });


        
      })
 .catch((err) => {

        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        console.log(err);
      });
  };

  return (
    <div className=" px-3 mx-auto mt-0 md:flex-0 shrink-0 w-100 lg:w-1/3">
    <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
        <h5>Register</h5>
      </div>
     
      <div className="flex-auto p-6">
        <form model="form text-left">
                    <div className="mb-4">
            <input aria-describedby="email-addon" aria-label="Email" 
                        placeholder="Enter your name"
                        value={values.name}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
              }className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" type="email"/>
          </div>
          <div className="mb-4">
            <input aria-describedby="email-addon" aria-label="Email" 
              placeholder="Enter email address"
              value={values.email}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" type="email"/>
          </div>
          <div className="mb-4">
            <input aria-describedby="password-addon" aria-label="Password" 
              placeholder="Enter password"
              value={values.pass}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, pass: event.target.value }))
              } className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" type="password"/>
          </div>
        <label>
          Role:
          <select
            value={values.model}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, model: event.target.value }))
            }
          >
            <option value="">Select model</option>
            <option value="Ola S1 X (3 kWh)">Ola S1 X (3 kWh)</option>
            <option value="Okinawa PraisePro">Okinawa PraisePro</option>
          </select>
        </label>
  
          <div className="text-center">
            <button disabled={submitButtonDisabled} onClick={handleSubmission} className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white" type="button">Sign up</button>
          </div>
          <p className="mt-4 mb-0 leading-normal text-sm">Already have an account? <a className="font-bold text-slate-700" href="../pages/sign-in.html">Sign in</a></p>
        </form>
      </div>
    </div>
  </div>
    );
 
}

export default Signup;
