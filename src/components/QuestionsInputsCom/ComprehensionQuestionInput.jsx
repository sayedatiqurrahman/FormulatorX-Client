import React, { useState } from 'react';

const ComprehensionQuestionInput = ({ addComprehensionQuestion }) => {
    const [comprehensionText, setComprehensionText] = useState('');
    const [comprehensionQuestions, setComprehensionQuestions] = useState(['', '', '', '']); // You can have multiple questions

    const handleSaveComprehensionQuestion = () => {
        if (comprehensionText && comprehensionQuestions.every((q) => q)) {
            addComprehensionQuestion({ type: 'comprehension', text: comprehensionText, questions: comprehensionQuestions });
            setComprehensionText('');
            setComprehensionQuestions(['', '', '', '']); // Reset the questions
        }
    };

    return (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Add Comprehension Question</h2>
            <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                placeholder="Comprehension Text"
                value={comprehensionText}
                onChange={(e) => setComprehensionText(e.target.value)}
            />
            {comprehensionQuestions.map((question, index) => (
                <input
                    key={index}
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                    placeholder={`Question ${index + 1}`}
                    value={question}
                    onChange={(e) => {
                        const updatedQuestions = [...comprehensionQuestions];
                        updatedQuestions[index] = e.target.value;
                        setComprehensionQuestions(updatedQuestions);
                    }}
                />
            ))}
            <button
                className="btn bg-slate-200 border-2 border-gray-800"
                onClick={handleSaveComprehensionQuestion}
            >
                Save Comprehension Question
            </button>
        </div>
    );
};

export default ComprehensionQuestionInput;
