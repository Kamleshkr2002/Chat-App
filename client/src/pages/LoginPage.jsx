import React from 'react'
import assets from '../assets/assets';

const LoginPage = () => {
    const [currState, setCurrState] = React.useState("Sign up");
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isDataSubmitted, setIsDataSubmitted] = React.useState(false);
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        if(currState === "Sign up" && !isDataSubmitted){
            setIsDataSubmitted(true);
            return;
        }
    }

    return (
        <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly 
    max-sm:flex-col backdrop-blur-2xl'>
            {/* ----------------------------------left------------------------------------------ */}
            <img src={assets.logo_big} alt="logo" className='w-[min(30vw,250px)]' />
            {/* ----------------------------------right------------------------------------------ */}
            <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg rounded-lg shadow-lg'>
                <h2 className='font-medium text-2xl flex justify-between items-center'>
                    {currState}
                    {isDataSubmitted && <img onClick={() => { setIsDataSubmitted(false) }}
                     src={assets.arrow_icon} alt="arrow" className='w-5 cursor-pointer' />}
                    
                </h2>
                {currState === "Sign up" && !isDataSubmitted && (
                    <input type="text" className='p-2 border border-gray-500 rounded-md focus:outline:none'
                        placeholder="Full Name" required name="fullName" id="fullName"
                        value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
                )}
                {!isDataSubmitted && (
                    <>
                        <input type="email" className='p-2 border border-gray-500 rounded-md focus:outline:none focus:ring-2 focus:ring-indigo-500'
                            placeholder="Email Address" required name="email" id="email"
                            value={email} onChange={(e) => { setEmail(e.target.value) }} />

                        <input type="password" className='p-2 border border-gray-500 rounded-md focus:outline:none focus:ring-2 focus:ring-indigo-500'
                            placeholder="Password" required name="password" id="password"
                            value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </>

                )}
                {
                    isDataSubmitted && (
                        <textarea rows={4} className='p-2 border border-gray-500 rounded-md focus:outline:none
                        focus:ring-2 focus:ring-indigo-500' placeholder="Provide a short bio.." name="bio" id="bio" required 
                        value={bio} onChange={(e) => { setBio(e.target.value) }}></textarea>
                    )
                }
                <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
                    {currState === "Sign up" ? "Create Account" : "Login Now"}
                </button>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <input type='checkbox'/>
                    <p>Agree to the terms of use & privacy policy</p>
                </div>
                <div className='flex flex-col gap-2 '>
                    {
                        currState === "Sign up" ? (<p className='text-sm text-gray-600'>Already have an account? 
                        <span className='font-medium text-violet-500 cursor-pointer' 
                        onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }}>Login here</span></p>) :
                        (<p className='text-sm text-gray-600'>Don't have an account? 
                        <span className='font-medium text-violet-500 cursor-pointer'
                        onClick={() => { setCurrState("Sign up") }}>Register</span></p>)
                    }
                </div>
            </form>
        </div>
    )
}

export default LoginPage;
