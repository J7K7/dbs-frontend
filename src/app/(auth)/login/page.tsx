"use client"
import '../../../styles/globals.css'
import { useEffect, useState } from 'react'
import loginController from '@/utils/apiControllers/loginController'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { RootState } from '@/lib/store'
import { useRouter } from 'next/navigation'
import Loading from '@/components/ui/Loading'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isLoading = useAppSelector((state: RootState) => state.auth.loading)
    const dispatch = useAppDispatch();
    const router = useRouter();



    const onSubmitForm = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await loginController({ email, password }, dispatch, router);
    }

    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            router.replace('/dashboard')
        }
    }, [])

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    return (
        <>
            <h1>this is the login page</h1>
            <form onSubmit={onSubmitForm}>

                {/* <div className='flex flex-col gap-1.5 border-2 px-2 py-4 w-2/3 sm:w-1/3 mx-auto 
                mt-20 rounded-lg'>
                    <InputFields
                        label="Email"
                        id="email"
                        type="text"
                        placeholder="johndoe@mail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <InputFields
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="***********"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    /> 
                    <SubmitButton
                        name="Login"
                        onClick={() => { }}
                        disabled = {isLoading}
                    />
                    
                </div> */}

                <div className="rounded-sm border w-2/3 sm:w-1/3 border-accent-100 bg-bkg-100 shadow-default p-4 mx-auto mt-20 shadow-md">
                    <div className="mb-4">
                        <label className="mb-3 block text-sm font-medium text-black ">
                            Email
                        </label>
                        <input
                            type="email"
                            id='email'
                            placeholder="Enter your email address"
                            className="w-full rounded border-[1.5px] border-accent-100 bg-white px-5 py-3 text-black outline-none transition focus:border-accent-200 active:border-accent-200 disabled:cursor-default disabled:bg-whiter "
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="mb-3 block text-sm font-medium text-black ">
                            Password
                        </label>

                        <div className='flex rounded border-[1.5px] border-accent-100 bg-white px-5 py-3 text-black outline-none transition focus:border-accent-200 active:border-accent-200'>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id='password'
                                placeholder="Enter password"
                                className="w-full outline-none disabled:cursor-default disabled:bg-whiter "
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityIcon />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* <div className="mb-5.5 mt-5 flex items-center justify-between">
                        <label htmlFor="formCheckbox" className="flex cursor-pointer">
                            <div className="relative pt-0.5">
                                <input
                                    type="checkbox"
                                    id="formCheckbox"
                                    className="taskCheckbox sr-only"
                                />
                                <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke">
                                    <span className="text-white opacity-0">
                                        <svg
                                            className="fill-current"
                                            width="10"
                                            height="7"
                                            viewBox="0 0 10 7"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                                                fill=""
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <p>Remember me</p>
                        </label>
                    </div> */}

                    <button className="flex w-full justify-center rounded bg-accent-300 p-3 font-medium text-gray hover:bg-opacity-90 text-white" type='submit'>
                        Log In
                    </button>
                </div>


            </form>
            {isLoading && <Loading />}
        </>
    )
}