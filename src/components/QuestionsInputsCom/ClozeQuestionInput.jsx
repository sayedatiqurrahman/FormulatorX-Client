import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DragAbleItems } from './DragAbleItems';
import { setFormData } from './QuestionForm';

const ClozeQuestion = ({ FORM_DATA, addClozeQuestion }) => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [clozeText, setClozeText] = useState('');
  const [clozeAnswer, setClozeAnswer] = useState('');

  const { Cloze } = FORM_DATA;

  Cloze.sentence = value.sentence;
  Cloze.options = options;

  const { register, handleSubmit } = useForm();

  const onSave = (data) => {
    setValue(data);
    console.log('Save:', value.sentence);
  };

  const markUnderline = () => {
    const text = getSelectionText();
    if (text) {
      setOptions([...options, text]);
    }
  };

  const handleSaveClozeQuestion = () => {
    if (clozeText && clozeAnswer) {
      addClozeQuestion({ type: 'cloze', text: clozeText, answer: clozeAnswer });
      setClozeText('');
      setClozeAnswer('');
    }
  };

  return (
    <div className="border-2 border-blue-400 rounded-lg p-4 mx-8">
      <div className="flex justify-between items-center">
        <p className="py-2 text-lg">Question 2</p>
        <div>
          <p>Points</p>
          <input
            type="number"
            placeholder=""
            className="input input-bordered w-[50%]"
            onChange={setFormData(Cloze, 'Points')}
          />
        </div>
      </div>
      <div>
        <p>Preview*</p>
        <p className="px-8 py-4 border-2 rounded-lg w-1/2">{value.sentence}</p>
      </div>

      <form onSubmit={handleSubmit(onSave)} className="mb-4">
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
          <div>
            <input className="btn btn-primary mt-10 mr-3" type="submit" value="Save" />
            <button className="btn btn-primary mt-10" onClick={markUnderline}>
              Mark Underline
            </button>
          </div>
        </div>
        {options.length > 0 && (
          <ul className="menu bg-blue-400 w-56 rounded-box">
            <DragAbleItems
              id="clozeOptions"
              items={options}
              onDragEnd={setOptions}
              child={(option, _index) => (
                <div className="flex gap-4 my-2">
                  <a>{option}</a>
                  <input type="checkbox" {...register('options')} checked="checked" className="checkbox checkbox-accent" />
                </div>
              )}
            />
          </ul>
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
        <button className="btn bg-slate-200 border-2 border-gray-800" onClick={handleSaveClozeQuestion}>
          Save Cloze Question
        </button>
      </div>
    </div>
  );
};

function getSelectionText() {
  let text = '';
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== 'Control') {
    text = document.selection.createRange().text;
  }
  return text;
}

export default ClozeQuestion;
