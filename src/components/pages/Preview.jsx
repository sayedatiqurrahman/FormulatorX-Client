import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Preview = () => {
    return (
        <div>
            <Link to={'/create-form'} className="btn mb-10 font-bold btn-primary avatar border-2 " title="Save it">
                <BiArrowBack size={26} fill="#fff" /> Back TO FormBuild
            </Link>
        </div>
    );
};

export default Preview;