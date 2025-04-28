import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../utils/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    console.log(auth);
    try {
      if (isSignup) {
        // Signup logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        });
        // Redirect to dashboard after signup
        navigate("/onboard");

        try {
          // First create the Firebase authentication user
          // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          // console.log("User signed up:", {
          //   uid: userCredential.user.uid,
          //   email: userCredential.user.email,
          // });

          // Then call your backend API to store the user in your database
          const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              user_id: userCredential.user.uid
            }),
          });
          console.log("Response from backend:", response);  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to create user in database');
          }
          

          navigate(`/onboard`); // Redirect to dashboard after signup
        } catch (error) {
          console.error("Error during signup:", error);
          // Handle error appropriately (show error message to user)
        }
        
      } else {
        // Login logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        });
        
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log("User logged in with Google:", {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });
      navigate(`/onboard`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 text-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          {isSignup
            ? "Create an account to get started."
            : "Welcome back! Please enter your details."}
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-2 rounded-lg font-medium"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="my-6 text-center text-gray-500 text-sm">or</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-purple-500 hover:underline"
            >
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;