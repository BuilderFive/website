import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import { supabase } from "~/util/supabaseClient"
import { IoMdClose, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Input } from './input';
import { Button } from './button';
import { MdiIcon } from '~/util';
import { mdiLoading } from '@mdi/js';
import LottiePlayer from '@lottiefiles/lottie-player';


const Modal = ({ showModal, setShowModal }) => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [finishedSignup, setFinishedSignup] = useState(false)
    const [errors, setErrors] = useState({emailError: "", firstname: "", lastname:"", passwordError: ""});

    const valiateForm = async() => {
        let returnableErrors: any = {emailError: "", firstname: "", lastname:"", passwordError: ""}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            returnableErrors.emailError = "Email is required";
        } else if (!emailRegex.test(email)) {
            returnableErrors.emailError = "Email is not valid";
        }
        if (!firstname) {
            returnableErrors.firstname = "First name is required";
        }
        if (!lastname) {
            returnableErrors.lastname = "Last name is required";
        }
        if (!email) {
            returnableErrors.emailError = "Email is required";
        } else if (!emailRegex.test(email)) {
            returnableErrors.emailError = "Email is not valid";
        }

        if (!password) {
            returnableErrors.passwordError = "Password is required";
        } else if (password.length < 8) {
            returnableErrors.passwordError = "Password must be at least 8 characters";
        }

        if (Object.values(returnableErrors).some((error) => error !== "")) {
            setErrors(returnableErrors)
            setLoading(false)
            return false;
        } else {
            setErrors(returnableErrors)//should be empty
            return true;
        }
    }

    const clearForm = () => {
        setEmail("");
        setLastname("");
        setFirstname("");
        setPassword("");
        setErrors({emailError: "", firstname: "", lastname:"", passwordError: ""});
    }

    const handleSignup = async (event) => { 
        const validatedForm = await valiateForm();
        if (!validatedForm) return //ensure form is valid
        setLoading(true);

        //Still need to add username to the accounts table
        const { data: { session }, error, } = await supabase.auth.signUp({
            email: email,
            password: password, 
            options: {
                data: { first_name: firstname, last_name: lastname },
            },
        });
        setLoading(false);
        if (error) {
            alert(error.message);
            return
        }
        setFinishedSignup(true)
        clearForm()
    };

    const handleSignIn = async (event) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            alert(error.message);
            return
        }
        setLoading(false);
        setShowModal(false)
        clearForm()
    }


    return (
        showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto backdrop-blur-md flex justify-center items-center">
            {finishedSignup && <div className="w-[540px] h-[540px] flex flex-col gap-[24px] bg-white items-center justify-center border-[4px] border-secondary1 rounded-[24px] p-[24px]">
                <div className='flex flex-row justify-center items-center text-center'>
                    <p className='text-2xl font-semibold text-background1'>Check your email to verify your account</p>
                </div>
                <div className='flex-1'/>
                <img src="./animations/email-verification.gif" height={150} width={150} className='self-center'/>
                <div className='flex-1'/>
                <Button variant="default" className='text-text1 text-xl font-semibold rounded-[12px] w-full bg-secondary1 py-[36px]'
                    onClick={()=>{
                        setFinishedSignup(false)
                        setShowModal(!showModal)
                    }}>
                    Okay
                </Button>
            </div>}
            {!finishedSignup && isSignUp && <div className="w-[540px] min-h-[540px] flex flex-col gap-[24px] bg-background1 border-[4px] border-secondary1 rounded-[24px] p-[24px]">
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <p className='text-4xl font-semibold text-text1'>Sign Up</p>
                        <IoMdClose color={"var(--text-1)"} className='text-4xl hover:cursor-pointer' onClick={() => setShowModal(false)} />
                    </div>
                    <p className='text-xl font-regular text-text3'>Join communities of real people</p>
                </div>

                <form onSubmit={e => e.preventDefault()}
                    className="items-center gap-[12px] w-full flex flex-col justify-center h-fit">
                    
                    <Input type="email"
                        value={email}
                        className="bg-white p-[12px] rounded-[8px] text-text6 text-lg invalid:border-red-400 h-fit"
                        placeholder="Email"
                        onChange={e => { 
                            setEmail(e.target.value) 
                        }}/>
                    <div className='flex flex-row w-full space-x-[12px]'>
                        <Input type="text"
                            value={firstname}
                            className="bg-white w-full p-[12px] rounded-[8px] text-text6 text-lg invalid:border-red-400 h-fit"
                            placeholder="First name"
                            onChange={e => setFirstname(e.target.value)}/>
                        <Input type="text"
                            value={lastname}
                            className="bg-white w-full p-[12px] rounded-[8px] text-text6 text-lg invalid:border-red-400 h-fit"
                            placeholder="Last name"
                            onChange={e => setLastname(e.target.value)}/>
                    </div>
                    
                    <div className='relative w-full flex items-center'>

                        <Input type={showPassword ? "text" : "password"}
                            value={password}
                            className="bg-white p-[12px] rounded-[8px] text-text6 text-lg invalid:border-red-400 h-fit"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}/>
                        <button className="absolute right-[12px]"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <IoMdEyeOff className="text-secondary1 text-lg" />
                            ) : (
                                <IoMdEye className="text-secondary1 text-lg" />
                            )}
                        </button>
                    </div>
                    
                </form>

                <div className='flex flex-row gap-[12px] flex-wrap'>
                    {errors.emailError && <p className='text-error1 text-sm'>{errors.emailError}</p>}
                    {errors.firstname && <p className='text-error1 text-sm'>{errors.firstname}</p>}
                    {errors.lastname && <p className='text-error1 text-sm'>{errors.lastname}</p>}
                    {errors.passwordError && <p className='text-error1 text-sm'>{errors.passwordError}</p>}
                </div>

                <div className='flex-1'/>

                <div className='flex flex-col gap-[12px]'>
                    {!loading ? 
                    <Button variant="default" className='text-text1 text-xl font-semibold rounded-[12px] w-full bg-secondary1 py-[36px]'
                        onClick={handleSignup}>
                        Submit
                    </Button> :
                    <Button variant="default" className='text-text4 text-xl font-semibold rounded-[12px] w-full bg-text3 py-[36px]'>
                        Loading...
                    </Button>
                    }

                    <div className='w-full'>
                        <div className='flex flex-row justify-center'>
                            <p className='text-text3'>Already have an account? <a onClick={()=>setIsSignUp(false)} className='text-secondary1 hover:cursor-pointer'>Sign in</a></p>
                        </div>
                    </div>
                </div>

            </div>}
            {!finishedSignup && !isSignUp && <div className="w-[540px] min-h-[540px] flex flex-col gap-[24px] bg-background1 border-[4px] border-secondary1 rounded-[24px] p-[24px]">
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <p className='text-4xl font-semibold text-text1'>Sign In</p>
                        <IoMdClose color={"var(--text-1)"} className='text-4xl hover:cursor-pointer' onClick={() => setShowModal(false)} />
                    </div>
                    <p className='text-xl font-regular text-text3'>Register to get full access!</p>
                </div>

                <form onSubmit={e => e.preventDefault()}
                    className="items-center gap-[12px] w-full flex flex-col justify-center h-fit">
                    
                    <Input type="email"
                        value={email}
                        className="bg-white p-[12px] rounded-[8px] text-text6 text-lg invalid:border-red-400 h-fit"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}/>
                    <Input type="password"
                        value={password}
                        className="bg-white p-[12px] rounded-[8px] text-text6 text-lg invalid:border-red-400 h-fit"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}/>
                </form>

                <div className='flex-1'/>

                <div className='flex flex-col gap-[12px]'>
                    {!loading ? 
                    <Button variant="default" className='text-text1 text-xl font-semibold rounded-[12px] w-full bg-secondary1 py-[36px]'
                        onClick={handleSignIn}>
                        Submit
                    </Button> :
                    <Button variant="default" className='text-text4 text-xl font-semibold rounded-[12px] w-full bg-text3 py-[36px]'>
                        Loading...
                    </Button>
                    }

                    <div className='w-full'>
                        <div className='flex flex-row justify-center'>
                            <p className='text-text3'>Don't have an account? <a onClick={()=>setIsSignUp(true)} className='text-secondary1 hover:cursor-pointer'>Sign up</a></p>
                        </div>
                    </div>
                </div>

               

            </div>}
        </div>
    ))
}

export default Modal
