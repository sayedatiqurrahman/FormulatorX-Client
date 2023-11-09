import React from 'react';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const Forms = () => {
    return (
        <div className='mt-10'>
            <Link to={'/create-form'} className='h-[200px] flex-col  w-[200px] btn font-bold'>
                <BsFileEarmarkPlus fill='#1b2ec2' size={30} />
                Create A Form</Link>
        </div>
    );
};

export default Forms;