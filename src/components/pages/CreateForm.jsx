import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiImageAdd, BiSolidSave } from 'react-icons/bi';
import { PiMonitorDuotone } from 'react-icons/pi';
import CategoriesQuestionInput from '../QuestionsInputsCom/CategoriesQuestionInput';
import ComprehensionQuestionInput from '../QuestionsInputsCom/ComprehensionQuestionInput';
import ClozeQuestionInput from '../QuestionsInputsCom/ClozeQuestionInput';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/Authprovider';
const CreateForm = () => {
    const { email, setEmail, Headline, setHeadline, questions, setQuestions, headerBG, setHeaderBG } = useContext(AuthContext)
    const navigate = useNavigate()
    // Header Image Functionality and States
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        const formData = new FormData()
        formData.append('image', selectedFile)
        const api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBbApiKey}`
        axios.post(api, formData).then(res => {
            setHeaderBG(res?.data?.data?.display_url)
            console.log(res.data.data);
        })
    };

    const [enableHeading, setEnableHeading] = useState(false)
    // Questions Functionality 

    const handleSaveQuestion = () => {
        if (!email) {
            toast.error("Please Enter Your Email")
            return
        }
        if (questions.length < 2) {
            toast.error("Please check that you are fill all questions")
            return
        }
        if (Headline && questions && email) {
            const formData = {
                email,
                headline: Headline,
                questions,
                headerBG
            };

            fetch("http://localhost:5000/postForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    toast.success("Saved Successfully");
                })
                .catch(error => {
                    console.error("Error while saving:", error);
                    toast.error("Error occurred while saving");
                });

            console.log(formData);
        }
    }


    const addCategoriesQuestion = (categoriesQuestion) => {
        setQuestions([...questions, categoriesQuestion]);

    };

    const addClozeQuestion = (clozeQuestion) => {
        setQuestions([...questions, clozeQuestion]);

    };

    const addComprehensionQuestion = (comprehensionQuestion) => {
        setQuestions([...questions, comprehensionQuestion]);

    };
    const comprehension = questions?.find(item => item.type === "comprehension")
    const cloze = questions?.find(item => item.type === "cloze")
    const category = questions?.find(item => item.type === "categories")

    const handlePreview = () => {
        if (!email) {
            toast.error("Please Enter Your Email")
            return
        }
        if (questions.length < 2) {
            toast.error("Please check that you are fill all questions")
        }
        if (questions.length > 2 && Headline) {
            navigate('/Preview')
        } else {
            toast.error("set Questions , Headline & Email")
        }

    }

    return (
        <div className='mb-20'>
            <div className='text-right'>
                <button onClick={handlePreview} className="btn mb-10 font-bold btn-primary avatar border-2 " title="Save it">
                    <PiMonitorDuotone size={26} fill="#fff" /> Preview
                </button>

            </div>
            <div className="h-[240px] w-full rounded-lg flex flex-col items-center justify-center relative" style={{ backgroundImage: `url(${headerBG})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>

                <h4 className='bg-base-200 p-2 rounded-lg'>Hight Must be 240px</h4>
                <div className='divider'></div>
                {
                    enableHeading ? <input onMouseLeave={(e) => {
                        setHeadline(e.target.value ? e.target.value : Headline)
                        setEnableHeading(false)
                    }}
                        defaultValue={Headline}

                        type='text' className='input w-3/4 md:w-96 outline-none' placeholder={"Enter a title"}
                        title='Leave Your Cursor from Input Field to Save the Heading'
                    /> : <button className='btn bg-slate-200 border-2 border-gray-800' onClick={() => setEnableHeading(true)}>{Headline ? Headline : "Enter a Headline"}</button>
                }

                <button className='btn rounded-xl  absolute bottom-3 right-3' onClick={() => fileInputRef.current.click()}>
                    <BiImageAdd size={24} fill='#1b2ec2' />
                </button>

                <input
                    type="file"
                    accept='image/*'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

            </div>
            {/* Header is finished here */}


            <div className='my-10 text-center'>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder='Enter Your Email...'
                    defaultValue={email}
                    className='input border-2 border-gray-300 w-3/5 font-bold' />
            </div>

            <CategoriesQuestionInput addCategoriesQuestion={addCategoriesQuestion} category={category} />


            <ClozeQuestionInput addClozeQuestion={addClozeQuestion} cloze={cloze} />


            <ComprehensionQuestionInput addComprehensionQuestion={addComprehensionQuestion} comprehension={comprehension} />

            <br />

            <button onClick={handleSaveQuestion} className="btn font-bold btn-primary avatar border-2 w-full" title="Save it">
                <BiSolidSave size={26} fill="#fff" /> Save Category and Items
            </button>



        </div >
    );
};

export default CreateForm;