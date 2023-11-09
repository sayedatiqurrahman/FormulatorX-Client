import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidSave } from 'react-icons/bi';
import { BsPlusCircleFill } from 'react-icons/bs';

const ComprehensionQuestionInput = ({ addComprehensionQuestion, comprehension }) => {
    const [comprehensionText, setComprehensionText] = useState('');
    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        if (comprehension) {
            if (comprehension?.passage) {
                setComprehensionText(comprehension?.passage)
            }

            if (comprehension?.questions) {
                setAllQuestions(comprehension?.questions)
            }
        }
    }, [comprehension]);

    const handleSaveComprehensionQuestion = () => {
        if (comprehensionText && allQuestions.every((q) => q.question && q.options.every((opt) => opt.text) && q.correctAnswer)) {
            const Comprehension = { type: 'comprehension', passage: comprehensionText, questions: allQuestions }
            addComprehensionQuestion(Comprehension);
            console.log(Comprehension);
        } else if (!comprehensionText) {
            toast.error("Please write a Passage")
        } else if (!allQuestions.every((q) => q.question && q.options.every((opt) => opt.text) && q.correctAnswer)) {
            toast.error("Please Make an MCQ and  fill in all options and select a correct answer")
        }
    };

    const handleChange = (e) => {
        setComprehensionText(e.target.value);
        adjustTextareaHeight(e.target);
    };

    const adjustTextareaHeight = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...allQuestions];
        updatedQuestions[questionIndex].options[optionIndex].text = value;
        setAllQuestions(updatedQuestions);
    };

    const handleAddMCQ = () => {
        setAllQuestions([
            ...allQuestions,
            {
                id: allQuestions.length + 1,
                question: '',
                options: [
                    { id: 'A', text: '' },
                    { id: 'B', text: '' },
                    { id: 'C', text: '' },
                    { id: 'D', text: '' },
                ],
                correctAnswer: '',
            },
        ]);
    };

    return (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Add Comprehension Question</h2>
            <textarea
                rows="1"
                style={{ resize: 'none', overflow: 'hidden' }}
                className="w-full textarea border border-gray-300 p-2 rounded-lg mb-2"
                placeholder="Write a Comprehension Passage"
                defaultValue={comprehensionText}
                onChange={handleChange}
                onInput={(e) => adjustTextareaHeight(e.target)}
            />

            <div className='grid md:grid-cols-2 gap-5'>
                {allQuestions.map((question, questionIndex) => (
                    <div key={questionIndex} className="p-10 relative bg-base-200 shadow-md">
                        <p className="bg-green-700 py-2 px-5 rounded-b-2xl max-w-[100px] text-center absolute top-0 left-1/2 -translate-x-1/2 font-bold text-white">{`MCQ-${questionIndex + 1}`}</p>
                        <p className="mt-10 font-bold">{`Question ${questionIndex + 1}:`}</p>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                            name={`MCQ-${questionIndex + 1}`}
                            placeholder={`Question ${questionIndex + 1}`}
                            value={question.question}
                            onChange={(e) => {
                                const updatedQuestions = [...allQuestions];
                                updatedQuestions[questionIndex].question = e.target.value;
                                setAllQuestions(updatedQuestions);
                            }}
                        />

                        <div>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name={`radio-${questionIndex}`}
                                        className="radio radio-primary"
                                        checked={question.correctAnswer === option.id}
                                        onChange={() => {
                                            const updatedQuestions = [...allQuestions];
                                            updatedQuestions[questionIndex].correctAnswer = option.id;
                                            setAllQuestions(updatedQuestions);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        name={`option-${questionIndex}-${optionIndex}`}
                                        value={option.text}
                                        placeholder={`option-${optionIndex + 1}`}
                                        className="ml-2 border border-gray-300 p-2 rounded-lg w-full"
                                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn btn-ghost avatar border-2 mt-5 border-[#1b2ec2] font-bold text-[#1b2ec2] hover:bg-[#1b2ec2] hover:text-white" onClick={handleAddMCQ}>
                <BsPlusCircleFill size={24} />
                Add MCQ
            </button>

            <div className="text-center">
                <button className="btn font-bold btn-primary avatar border-2" onClick={handleSaveComprehensionQuestion}>
                    <BiSolidSave size={26} fill="#fff" /> Save Comprehension Question
                </button>
            </div>
        </div>
    );
};

export default ComprehensionQuestionInput;
