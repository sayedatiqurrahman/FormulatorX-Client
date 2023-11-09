import React from 'react';
import animation from '../../../public/Form.json'
import Lottie from "lottie-react-web";
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className='flex -z-10 flex-col-reverse md:flex-row items-center h-[500px]'>
            <div className='w-full  '>
                <h1 className='text-4xl text-primary'>Welcome to Formulator<span className='text-[#ff60f4]'>X</span></h1>
                <h3 className='text-base font-semibold'>Create, Customize, and Collect Responses</h3>
                <p className='w-3/4 mt-10'>Build interactive forms with ease and gather valuable data from your users. Whether it's surveys, quizzes, or feedback forms, FormulatorX has you covered.</p>

                <Link className='btnPrimary' to='/forms'>Get Started</Link>
            </div>
            <div className='w-full '>
                <Lottie
                    options={{
                        animationData: animation
                    }}
                />
            </div>
        </div>
    );
};

export default Home;