import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import {auth} from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => { 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [otp,setOtp] = useState("");
  const [ph,setPh] = useState("");
  const [showOTP,setShowOTP] = useState(false);
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true); 
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  function onCaptchVerify(){
    if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignup();
        },
        'expired-callback': () => {

        }
      });
    }
  }

  function onSignup(){
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = '+' + ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOTP(true);
      toast.success("OTP Sent!");

    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });

  }

  function onOTPVerify(){
    setLoading(true);
    window.confirmationResult.confirm(otp).then(async(res)=>{
      console.log(res);
      setUser(res.user);
      setLoading(false);
    }).catch(err=>{
      console.log(err);
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div id="recaptcha-container"></div>
        {
          user ? 
          
        (<h2>Login Successful</h2>) :
        (<div>
          
          <form className="space-y-6">
            
            {
              showOTP ?
              (
              <>
                <div>
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-left text-2xl text-gray-900">
                      Welcome to
                    </h2>
                    <h2 className="mt-6 text-left text-6xl font-extrabold text-[#6DA9E4]">
                      OTP
                    </h2>
                    <h2 className="mt-6 text-left text-3xl text-gray-900">
                      Get started with registration.
                    </h2>
                  </div>
                  <div className="mt-1">
                    
                    <OtpInput
                    className="appearance-none block w-full px-3 py-2 bg-[#CBE3EF] border border-[#6DA9E4] rounded-md shadow-sm placeholder-black-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    OTPLength={6}
                    value={otp}
                    onChange={setOtp}
                    otpType="number"
                    disabled={false}
                    autoFocus>
                    </OtpInput>
                  </div>
                </div>
                
                <div> 
                  <button
                    onClick={onOTPVerify}
                    className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[1rem] text-black bg-[#46EBBD] hover:bg-[#333333] hover:text-white"
                  >
                    <span>Verify</span>
                  </button>
                </div>
              </>
              ) : 
              (
              <>
              <div>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-left text-2xl text-gray-900">
                      Welcome to
                    </h2>
                    <h2 className="mt-6 text-left text-6xl font-extrabold text-[#6DA9E4]">
                      PI Tech
                    </h2>
                    <h2 className="mt-6 text-left text-3xl text-gray-900">
                      Get started with registration.
                    </h2>
                  </div>
                <div className="mt-1">
                  
                  <PhoneInput
                   country={"in"}
                   value={ph}
                   onChange={setPh}/>
                </div>
              </div>
              
              <div>
                <button
                  onClick={onSignup}
                  className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[1rem] text-black bg-[#46EBBD] hover:bg-[#333333] hover:text-white"
                >
                  <span>Let's go</span>
                </button>
              </div>
            </>
            )

            }
              

              
          </form>
        </div> )
        }
        
      </div>
    </div>
  );
};

export default Login;
