import axios from 'axios';
import React, { useRef, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { BsPlusCircleFill, BsQuestionCircle } from 'react-icons/bs';
import { useForm } from "react-hook-form"
import CategoriesQuestionInput from '../QuestionsInputsCom/CategoriesQuestionInput';
import ComprehensionQuestionInput from '../QuestionsInputsCom/ComprehensionQuestionInput';
import ClozeQuestionInput from '../QuestionsInputsCom/ClozeQuestionInput';
const CreateForm = () => {

    // Header Image Functionality and States
    const [BgImage, setBgImage] = useState("https://i.ibb.co/8mcMH11/image.png")

    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        const formData = new FormData()
        formData.append('image', selectedFile)
        const api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBbApiKey}`
        axios.post(api, formData).then(res => {
            setBgImage(res?.data?.data?.display_url)
            console.log(res.data.data);
        })
    };

    // Headline Functionality and States
    const [enableHeading, setEnableHeading] = useState(false)
    const [Headline, setHeadline] = useState('')

    // Questions Functionality and States
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');

    // Full Forms States or Functions of React Hook 
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);


    const addCategoriesQuestion = (categoriesQuestion) => {
        setQuestions([...questions, categoriesQuestion]);

    };

    const addClozeQuestion = (clozeQuestion) => {
        setQuestions([...questions, clozeQuestion]);

    };

    const addComprehensionQuestion = (comprehensionQuestion) => {
        setQuestions([...questions, comprehensionQuestion]);

    };



    return (
        <div>
            <div className="h-[240px] w-full rounded-lg flex flex-col items-center justify-center relative" style={{ backgroundImage: `url(${BgImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>

                <h4 className='bg-base-200 p-2 rounded-lg'>Hight Must be 240px</h4>
                <div className='divider'></div>
                {
                    enableHeading ? <input onMouseLeave={(e) => {
                        setHeadline(e.target.value ? e.target.value : Headline)
                        setEnableHeading(false)
                    }}

                        type='text' className='input w-3/4 md:w-96 outline-none' placeholder={"Enter a title"}
                        title='Leave Your Cursor from Input Field to Save the Heading'
                        defaultValue={Headline && Headline}
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

            <div className=''>
                <h1 className='text-4xl font-bold mt-10 flex gap-1 items-center'> -Question 1 <BsQuestionCircle size={24} /></h1>


                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-start'>

                    <br /><br />
                    <CategoriesQuestionInput addCategoriesQuestion={addCategoriesQuestion} />


                    <ClozeQuestionInput addClozeQuestion={addClozeQuestion} />

                    <ComprehensionQuestionInput addComprehensionQuestion={addComprehensionQuestion} />

                    <br />
                    {/* <div className="dropdown dropdown-end ml-auto">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-[#ff60f4] ">
                            <BsPlusCircleFill size={28} fill='#1b2ec2' />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li onClick={() => setEnableCategoriesInput(true)}><a>Catagories</a></li>
                            <li onClick={() => setEnableCategoriesInput(true)}><a>Cloze</a></li>
                            <li onClick={() => setEnableCategoriesInput(true)}><a>Comprehension</a></li>
                        </ul>
                    </div> */}


                    <input type="submit" />
                </form>

            </div>
        </div >
    );
};

export default CreateForm;