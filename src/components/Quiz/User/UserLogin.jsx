import React, {useState } from "react";
import Footer from './Footer'
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase"; // adjust path as per your structure
import { signInWithPopup } from "firebase/auth";
const VITE_API_URL = import.meta.env.VITE_API_URL;


function UserLogin(){
    const [name,setName]=useState('')
    const [usn,setUSN]=useState('')
    const [email,setEmail]=useState('')
    const [semester,setSemester]=useState('')
    const [branch,setBranch]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [mobileNumCorrect,setmobileNumCorrect] = useState(false)
    const [emailCorrect,setemailCorrect] = useState(false)
    const [USNCorrect, setUSNcorrect] = useState(false)

    const navigate=useNavigate()

    const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        setEmail(user.email); // Google verified email
        setName(user.displayName) // Full name of the user
      } catch (error) {
        console.error("Google Sign-In failed", error);
      }
    };
    async function Validate(){
      if(!name ||!usn||!email ||!semester||!branch||!mobileNo){
        alert("Please fill all the credentials")
        return;
      }
      if(!USNCorrect){
        alert("Wrong USN!...")
        return
      }
      if(!mobileNumCorrect){
        alert("Mobile Number must be 10 Digit")
        return
      }

      navigate('/quiz/UserQuiz')
      const userData={
        "name" : name,
        "usn" : usn,
        "semester":semester,
        "branch":branch,
        "mobileNo":mobileNo,
        "email" : email
      }

      localStorage.setItem('user', JSON.stringify(userData));

      try {
      const res = await fetch(`${VITE_API_URL}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (res.ok) {
        alert("User Logged in successfully!");
      } else {
        alert("Failed to submit quiz.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Server error. Try again.");
    }
    }

  return(
    <div className="
  min-h-[513px]
  flex flex-col justify-between items-center
  w-auto max-w-md
  mx-4 sm:mx-6 md:mx-auto
  px-6 sm:px-8 py-10
  space-y-8
  text-white border border-purple-400 rounded-2xl
">
      <h1 className="text-3xl font-semibold">Login</h1>

      {/* Email verify by google */}
      {/* <div className="p-4"> */}
        {/* <div className="mt-4"> */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition duration-300"
          >
            Sign in with Google
          </button>
        {/* </div> */}

        {/* {email && (
          <p className="mt-2 text-green-400">Logged in as: {email}</p>
        )} */}
      {/* </div> */}

      
      <input 
        className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
        type="text"
        placeholder={!name && "User Name"}
        value={name}
        // onChange={(e) => setName(e.target.value)}
        readOnly
      />

      <input 
        className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
        type="text"
        placeholder={!email && "Email ID"}
        value={email}
        // onChange={(e) => setName(e.target.value)}
        readOnly
      />

      <input 
        className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
        type="text"
        placeholder="USN"
        value={usn}
        onChange={(e) => {
          const inputUSN = e.target.value;
          setUSN(inputUSN);
          // Check format like 2SD23CS060
          // if (/^[0-9][A-Z,a-z]{2}[0-9]{2}[A-Z,a-z]{2}[0-9]{3}$/.test(inputUSN)) {
          //   setUSNcorrect(true);
          // } else {
          //   setUSNcorrect(false);
          // }
          setUSNcorrect(true);
        }}
      />
      {/* error msg if usn not match */}
      {!USNCorrect && usn.length > 0 && (
        <p className="text-red-500 text-sm">Invalid USN format</p>
      )}

      <div className="relative w-full">
        <input
        className="w-full text-white bg-transparent border-b-2 border-purple-500 focus:outline-none placeholder-gray-400"
        type="text"
        placeholder="Mobile Number"
        value={mobileNo}
        onChange={
          (e) => {
            const number = e.target.value
            // number input only 10
            if(/^\d{0,10}$/.test(number)){
              setMobileNo(number);
              if (number.length === 10) {
                setmobileNumCorrect(true);
              } else {
                setmobileNumCorrect(false);
              }
            }
          }
        }
        />

        {/* SVG Icon inside input */}
        {/* Indicater for number input red for 0 > number < 10 and gree for number === 10 */}
        {
          mobileNo.length > 0 
          && mobileNo.length < 10 
          && (<p className="text-red-500 text-sm">Mobile number must be 10 digits</p>)
        }
        {mobileNo.length === 10 && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
            {/* Check Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </div>

      <select className="w-full text-white bg-black border-b-2 border-purple-500 focus:outline-none"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}>
        <option value="" disabled selected hidden>
          Semester
        </option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
      </select>

      <select className="w-full text-white bg-black border-b-2 border-purple-500 focus:outline-none"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}>
        <option value="" disabled selected hidden>
          Branch
        </option>
        <option value='CSE'>CSE</option>
        <option value='ISE'>ISE</option>
        <option value='AIML'>AIML</option>
        <option value='ECE'>ECE</option>
        <option value='EEE'>EEE</option>
        <option value='MECH'>MECH</option>
        <option value='CHEM'>CHEM</option>
        <option value='CIVIL'>CIVIL</option>
      </select>

      <button
        className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition duration-300"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          Validate();
        }}
      >
        Submit
      </button>
    </div >
  )
}

export default UserLogin;
