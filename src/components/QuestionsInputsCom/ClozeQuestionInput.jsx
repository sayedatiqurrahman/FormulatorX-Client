import React, { useState, useEffect } from 'react';
import { MdDragIndicator, MdOutlineFormatUnderlined } from 'react-icons/md';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { toast, Toaster } from 'react-hot-toast';
import { BiSolidSave } from 'react-icons/bi';

const ClozeQuestion = ({ addClozeQuestion, cloze }) => {

    const [options, setOptions] = useState([]);
    const [clozeTextPreview, setClozeTextPreview] = useState('');
    const [fullSentence, setFullSentence] = useState('');
    useEffect(() => {
        if (cloze) {
            if (cloze.question) {
                setClozeTextPreview(cloze?.question)
            }
            if (cloze?.closeOptions) {
                setOptions(cloze?.closeOptions)
            }
            if (cloze?.fullSentence) {
                setFullSentence(cloze?.fullSentence)
            }
        }
    }, [])
    const onSubmit = (data) => {
        console.log('Save:', data.sentence);
    };

    const markUnderline = (e) => {
        e.preventDefault();
        const text = getSelectionText();
        if (text) {
            const updatedOptions = [...options, { text, checked: true }];
            setOptions(updatedOptions);

            const inputField = document.querySelector('input[name="Cloze Question"]');
            if (!fullSentence) {
                setFullSentence(inputField.value)
            }
            if (inputField) {

                const currentSentence = inputField.value;
                const selectionStart = inputField.selectionStart;
                const selectionEnd = inputField.selectionEnd;

                let newPreviewSentence;
                if (clozeTextPreview) {
                    newPreviewSentence = `${clozeTextPreview.substring(0, selectionStart)} _______ ${clozeTextPreview.substring(selectionEnd)}`;
                } else {

                    newPreviewSentence = `${currentSentence.substring(0, selectionStart)} _______ ${currentSentence.substring(selectionEnd)}`;
                }


                const newSentence = `${currentSentence.substring(0, selectionStart)} <__${text}__> ${currentSentence.substring(selectionEnd)}`;

                inputField.value = newSentence;
                setClozeTextPreview(newPreviewSentence);
            }
        }
    };

    const handleSaveClozeQuestion = (e) => {
        e.preventDefault();
        if (clozeTextPreview && fullSentence && options) {
            const cloze = {
                type: 'cloze', question: clozeTextPreview, answer: options.length < 2 ? options[0] : "Answer is not available",
                closeOptions: options,
                fullSentence: fullSentence
            }
            addClozeQuestion(cloze);
            console.log(cloze);
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(options);
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, reorderedItem);
        setOptions(reorderedItems);
    };

    const handleCheckboxChange = (index) => {
        const updatedOptions = [...options];
        updatedOptions[index] = { ...updatedOptions[index], checked: !updatedOptions[index].checked };
        setOptions(updatedOptions.filter((option) => option.checked));
    };

    const [droppableId, setDroppableID] = useState('cloze');

    useEffect(() => {
        setDroppableID('cloze-id');
    }, []);

    const onMouseMoveHandler = () => {
        setTimeout(() => {
            setDroppableID('cloze-id-handling');
        }, 1000);
    };

    return (
        <div className="p-4 my-20 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">Cloze Question</h2>
            <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                <h2 className="text-lg font-semibold mb-2"> Cloze Question Preview</h2>
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                    placeholder="Cloze Question Preview"
                    value={clozeTextPreview}
                    readOnly
                    disabled
                />

                <div className="flex items-center gap-4">
                    <div className="w-full">
                        <label className="label">
                            <h2 className="text-lg font-semibold mb-2">Add Cloze Question</h2>
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                name="Cloze Question"
                                onChange={(e) => setClozeTextPreview(e.target.value)}
                                defaultValue={fullSentence}
                                placeholder="Underline the words here to convert them into blanks"
                                className="input input-bordered w-full"
                            />
                            <button className="btn btn-ghost avatar border-2 border-[#1b2ec2] font-bold text-[#1b2ec2] hover:bg-[#1b2ec2] hover:text-white" onClick={(e) => markUnderline(e)}>
                                <MdOutlineFormatUnderlined size={20} /> Underline
                            </button>
                        </div>
                    </div>
                </div>

                {options.length > 0 && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId={droppableId}>
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef} className="menu bg-gray-200 mt-5 w-full rounded-md" onMouseEnter={onMouseMoveHandler}>
                                    {options.map((option, index) => (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="flex gap-4 my-2 py-2 items-center bg-gray-300"
                                                >
                                                    <MdDragIndicator size={30} />
                                                    <a>{option.text}</a>
                                                    <input
                                                        name={`checkbox-answer-${index}`}
                                                        type="checkbox"
                                                        checked={option.checked}
                                                        onChange={() => handleCheckboxChange(index)}
                                                        className="checkbox checkbox-accent ml-auto mr-2 rounded-md"
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}


                <div className="text-center mt-5">
                    <button onClick={(e) => handleSaveClozeQuestion(e)} className="btn font-bold btn-primary avatar border-2" title="Save it">
                        <BiSolidSave size={26} fill="#fff" /> Save Cloze Question
                    </button>
                </div>
            </div>
        </div>
    );
};

function getSelectionText() {
    let text = "";
    const inputField = document.querySelector('input[name="Cloze Question"]');
    if (inputField && inputField.selectionStart !== undefined) {
        const startPos = inputField.selectionStart;
        const endPos = inputField.selectionEnd;
        if (startPos !== endPos) {
            text = inputField.value.substring(startPos, endPos);
        }
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
        text = document.selection.createRange().text;
    }
    return text;
}

export default ClozeQuestion;
