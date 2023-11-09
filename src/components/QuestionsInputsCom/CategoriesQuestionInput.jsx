import React, { useState } from 'react';
import { BiSolidSave } from 'react-icons/bi';
import { MdDragIndicator } from 'react-icons/md';
import { BsFillTrash3Fill, BsPlusCircleFill } from 'react-icons/bs';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const CategoriesQuestionInput = ({ addCategoriesQuestion }) => {
    const [question, setQuestion] = useState('');
    const [addFieldCategory, setAddFieldCategory] = useState(['']);
    const [addFieldItems, setAddFieldItems] = useState(['']);
    const [allData, setAllData] = useState([]);

    const handleAddCategoryOption = () => {
        setAddFieldCategory([...addFieldCategory, '']);
    };

    const handleRemoveCategoryOption = (index) => {
        if (index !== 0) {
            const updatedCategoryOptions = [...addFieldCategory];
            updatedCategoryOptions.splice(index, 1);
            setAddFieldCategory(updatedCategoryOptions);
        }
    };

    const handleAddItemsOption = () => {
        setAddFieldItems([...addFieldItems, '']);
    };

    const handleRemoveItemsOption = (index) => {
        if (index > 0) {
            const updatedItems = [...addFieldItems];
            updatedItems.splice(index, 1);
            setAddFieldItems(updatedItems);

            const updatedAllData = [...allData];
            updatedAllData.splice(index, 1);
            setAllData(updatedAllData);
        }
    };

    const handleSaveQuestion = () => {
        const categoriesQuestion = {
            type: 'categories',
            question,
            categories: addFieldCategory.filter((option) => option.trim() !== ''),
            items: addFieldItems.filter((option) => option.trim() !== ''),
            allData,
        };
        console.log(categoriesQuestion);
        addCategoriesQuestion(categoriesQuestion);
    };

    const handleDragEnd = (result, sourceArray, setArray) => {
        if (!result.destination) return;
        const items = Array.from(sourceArray);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setArray(items);
    };
    const [droppableId, setDroppableID] = useState('category');
    return (
        <div onMouseMove={() => setDroppableID("category-id")} className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">Categories Question</h2>
            <div className="flex gap-2 items-start">
                <DragDropContext onDragEnd={(result) => handleDragEnd(result, addFieldCategory, setAddFieldCategory)}>
                    <Droppable droppableId={droppableId} type="CategoryField">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="w-full">
                                <label className="mb-2">Categories:</label>
                                {addFieldCategory.map((option, index) => (
                                    <div key={index} className="mb-2">
                                        <Draggable draggableId={index.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    className="w-full items-center flex gap-2 categories"
                                                >
                                                    <div className="max-w-lg w-full mt-2 rounded-md bg-slate-200 flex gap-2 items-center">
                                                        <MdDragIndicator size={40} />
                                                        <input
                                                            type="text"
                                                            value={option}
                                                            onChange={(e) => {
                                                                const updatedOptions = [...addFieldCategory];
                                                                updatedOptions[index] = e.target.value;
                                                                setAddFieldCategory(updatedOptions);
                                                            }}
                                                            placeholder="Category"
                                                            className="input w-full max-w-lg border border-gray-300 rounded-md p-2"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveCategoryOption(index)}
                                                        className="btn btn-ghost text-red-600 hover:text-red-800"
                                                    >
                                                        <BsFillTrash3Fill />
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    </div>
                                ))}
                                {provided.placeholder}
                                <button
                                    type="button"
                                    onClick={handleAddCategoryOption}
                                    className="btn btn-ghost avatar border-2 border-[#1b2ec2] font-bold text-[#1b2ec2] hover:bg-[#1b2ec2] hover:text-white"
                                    title="Add Categories Field"
                                >
                                    <BsPlusCircleFill size={24} />
                                    Add Category
                                </button>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                {/* Add Items */}
                <div className="w-full mt-2">
                    <label className="my-2">Items:</label>
                    <DragDropContext onDragEnd={(result) => handleDragEnd(result, addFieldItems, setAddFieldItems)}>
                        <Droppable droppableId={droppableId}>
                            {(provider) => (
                                <div ref={provider.innerRef} {...provider.droppableProps}>
                                    {addFieldItems.map((option, index) => (
                                        <Draggable draggableId={index.toString()} index={index}>
                                            {(provider) => (
                                                <div ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps} className="flex gap-3 mb-2 items-center">
                                                    <div className="w-full rounded-md bg-slate-200 flex gap-2 items-center">
                                                        <MdDragIndicator size={40} />
                                                        <input
                                                            type="text"
                                                            value={option}
                                                            onChange={(e) => {
                                                                const updatedOptions = [...addFieldItems];
                                                                updatedOptions[index] = e.target.value;
                                                                setAddFieldItems(updatedOptions);
                                                            }}
                                                            placeholder="Items.."
                                                            className="input border w-full max-w-md border-gray-300 rounded-md p-2"
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <select
                                                            defaultValue="Match which is Answer"
                                                            onChange={(e) => {
                                                                const updatedAllData = [...allData];
                                                                const categoryWithItem = {
                                                                    item: addFieldItems[index],
                                                                    category: e.target.value,
                                                                };
                                                                updatedAllData[index] = categoryWithItem;
                                                                setAllData(updatedAllData);
                                                            }}
                                                            className="select select-bordered border w-full max-w-md border-gray-300 rounded-md p-2"
                                                        >
                                                            <option disabled>Match which is Answer</option>
                                                            {addFieldCategory.map((category, idx) => (
                                                                <option key={idx}>{category}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveItemsOption(index)}
                                                        className="btn btn-ghost text-red-600 hover:text-red-800"
                                                    >
                                                        <BsFillTrash3Fill />
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provider.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className="items-center flex gap-2 flex-wrap">
                        <button type="button" onClick={handleAddItemsOption} className="btn btn-ghost avatar border-2 border-[#1b2ec2] font-bold text-[#1b2ec2] hover:bg-[#1b2ec2] hover:text-white">
                            <BsPlusCircleFill size={24} />
                            Add Items
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <button onClick={handleSaveQuestion} className="btn font-bold btn-primary avatar border-2" title="Save it">
                    <BiSolidSave size={26} fill="#fff" /> Save Category and Items
                </button>
            </div>
        </div>
    );
};

export default CategoriesQuestionInput;
