import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [passwords, setpasswords] = useState({ site: "", username: "", pass: "" })
    const [passwordArray, setpasswordArray] = useState([]);

    const getdata =async ()=>{
 let req =await fetch("http://localhost:3000/");
 let data =await req.json()
            setpasswordArray(data);
        
    }
    

    useEffect(() => {
       getdata();
    }, [])


    const change = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("svg/crossEye.svg")) {
            passwordRef.current.type = "text"
            ref.current.src = "./svg/eye.svg"
        }
        else {
            ref.current.src = "./svg/crossEye.svg"
            passwordRef.current.type = "password"
        }
    }

    const copied = (text) => {
   
        navigator.clipboard.writeText(text)
    }

    const editPass =async (id) => {
        console.log("editing...", id)
        setpasswords({...passwordArray.filter(i => i.id === id)[0], id:id})
        setpasswordArray(passwordArray.filter(item => item.id != id))
       
    }
    const deletePass =async (id) => {
        
        console.log("deleting...", id)
        let c = confirm("Do u really want to delete ?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id != id))
            let res = await fetch("http://localhost:3000/",{method:"DELETE",headers: {"Content-Type":"application/json"},body: JSON.stringify({id})});

            // localStorage.setItem("data", JSON.stringify(passwordArray.filter(item => item.id != id)));
        }

    }

    const handleChange = (e) => {
        setpasswords({ ...passwords, [e.target.name]: e.target.value });
    }
    const savePasswords =async () => {

        console.log(passwords.id)
    await fetch("http://localhost:3000/",{method:"DELETE",headers: {"Content-Type":"application/json"},body: JSON.stringify({...passwords, id: passwords.id})});


        const newPasswordArray=[...passwordArray, { ...passwords, id: uuidv4() }]
        setpasswordArray(newPasswordArray);
     await fetch("http://localhost:3000/",{method:"POST",headers: {"Content-Type":"application/json"},body: JSON.stringify( { ...passwords, id: uuidv4() })});
        // localStorage.setItem("data", JSON.stringify([...passwordArray, { ...passwords, id: uuidv4() }]));
        // console.log([...passwordArray, passwords]);

        
        setpasswords({ site: "", username: "", pass: "" })
     
       
    }
    return (

        <>
         
            <div className=' flex-col items-center'>
                <div>
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(145%_145%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
                </div>
                <div className='flex-col container px-40 py-16 items-center mx-auto'>
                    <div className=' flex justify-center p-7 '>
                        <span className=' text-3xl text-green-400 font-bold'>&lt;</span>
                        <span className=' font-bold text-black text-3xl'>Pass</span>
                        <span className=' text-green-400 text-3xl  font-bold '>OP/&gt;</span>
                    </div>
                    <p className=' text-green-500 text-xl text-center'>Your own password Manager</p>
                    <div className='flex flex-col  p-4 gap-8 items-center'>
                        <input type="text" value={passwords.site} onChange={handleChange} name='site' placeholder='Enter Web-site URL' className=' rounded-full border border-black w-full p-4 py-1' />
                        <div className=' flex justify-center w-full text-black gap-8 py-4'>
                            <input onChange={handleChange} value={passwords.username} placeholder='Enter Username' name='username' className=' p-4 py-1 rounded-full border border-black w-full' type="text" />
                            <div className='relative'>

                                <input onChange={handleChange} ref={passwordRef} value={passwords.pass} placeholder='Enter password' name='pass' className=' p-4 py-1 rounded-full border border-black w-full' type="password" />
                                <span className='absolute right-5 top-2'><img onClick={change} ref={ref} src="./svg/crossEye.svg" className='w-5 ' alt="svg" /></span>
                            </div>

                        </div>

                        <button onClick={savePasswords} className='flex justify-center items-center gap-3 bg-green-400 px-7 py-2 rounded-full w-fit hover:bg-green-300'> <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"></lord-icon>Save</button>

                    </div>

                    <div className="passwords m-auto ">
                        <h2 className=' m-3 text-lg font-bold w-full'>Your passwords</h2>

                        {passwordArray.length === 0 && <div>No Passwords to show</div>}
                        {passwordArray.length != 0 && <table className="table-auto w-full m-3 overflow-hidden rounded">
                            <thead>
                                <tr className=' bg-green-300'>
                                    <th>Web-Site</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className=' bg-emerald-100'>
                                {passwordArray.map((item, i) => {
                                    return <tr className='invert text-white' key={i}>
                                        <td className=' text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-4'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <img className='invert' onClick={() => copied(item.site)} src="svg/copy.svg" alt="" />
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border  border-white'>
                                            <div className='flex items-center justify-center gap-4'>
                                                {item.username}
                                                <img className='invert' onClick={() => copied(item.username)} src="svg/copy.svg" alt="" />

                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-4'>
                                                <span>{'*'.repeat(item.pass.length)}</span>
                                                <span> <img className='invert' onClick={() => copied(item.pass)} src="svg/copy.svg" alt="" /></span>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-4'>
                                                <span onClick={() => { editPass(item.id) }}><lord-icon
                                                    src="https://cdn.lordicon.com/oqaajvyl.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon></span>
                                                <span onClick={() => { deletePass(item.id) }}><lord-icon
                                                    src="https://cdn.lordicon.com/vlnvqvew.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                >

                                                </lord-icon></span>
                                            </div>
                                        </td>
                                    </tr>

                                }
                                )}

                            </tbody>
                        </table>
                        }
                    </div>
                </div>

            </div>

        </>

    )
}

export default Manager
