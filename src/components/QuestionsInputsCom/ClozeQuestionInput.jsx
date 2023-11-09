import React, { useEffect, useState } from 'react';
import { BiSolidSave } from 'react-icons/bi';
import { MdDragIndicator } from 'react-icons/md';
import { BsFillTrash3Fill, BsPlusCircleFill } from 'react-icons/bs';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';

const ClozeQuestion = ({ addClozeQuestion }) => {
    const { register, handleSubmit } = useForm();
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    const [clozeText, setClozeText] = useState('');
    const [clozeAnswer, setClozeAnswer] = useState('');


    const onSubmit = (data) => {
        setValue(data);
        console.log('Save:', value.sentence);
    };

    const markUnderline = (e) => {
        e.preventDefault();
        const text = getSelectionText();
        if (text) {

            setOptions([...options, { text, checked: true }]);
        }
    };

    const handleSaveClozeQuestion = (e) => {
        e.preventDefault(); // Prevent default button click behavior
        if (clozeText && clozeAnswer) {
            addClozeQuestion({ type: 'cloze', text: clozeText, answer: clozeAnswer });
            setClozeText('');
            setClozeAnswer('');
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
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">Cloze Question</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <div className="flex items-center gap-4 ">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Sentence*</span>
                        </label>
                        <input
                            type="text"
                            name="sentence"
                            {...register('sentence')}
                            placeholder="Underline the words here to convert them into blanks"
                            className="input input-bordered"
                        />
                    </div>


                    <button className="btn btn-primary mt-10" onClick={(e) => markUnderline(e)}>
                        Mark Underline
                    </button>

                </div>
                <input className="btn btn-primary mt-10 mr-3" type="submit" value="Save" />

                {options.length > 0 && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId={droppableId}>
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef} className="menu bg-blue-400 w-56 rounded-box" onMouseEnter={onMouseMoveHandler}>
                                    {options.map((option, index) => (
                                        <Draggable key={index} draggableId={index.toString()} index={index} >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="flex gap-4 my-2"
                                                >
                                                    <a>{option.text}</a>
                                                    <input
                                                        name={`checkbox-answer-${index}`}
                                                        type="checkbox"
                                                        checked={option.checked}
                                                        onChange={() => handleCheckboxChange(index)}
                                                        className="checkbox checkbox-accent"
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
            </form>


            {/* Cloze Question Input */}
            <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Add Cloze Question</h2>
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                    placeholder="Cloze Text"
                    value={clozeText}
                    onChange={(e) => setClozeText(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                    placeholder="Answer (e.g., 'your answer')"
                    value={clozeAnswer}
                    onChange={(e) => setClozeAnswer(e.target.value)}
                />
                <button className="btn bg-slate-200 border-2 border-gray-800" onClick={(e) => handleSaveClozeQuestion(e)}>
                    Save Cloze Question
                </button>
            </div>
        </div >
    );
};

function getSelectionText() {
    let text = "";
    const inputField = document.querySelector('input[name="sentence"]');
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
