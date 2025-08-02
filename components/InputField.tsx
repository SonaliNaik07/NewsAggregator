import React from 'react';

const InputField: React.FC = () => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Username or Email"
        className="input-field"
        required
      />
      <i className="material-symbols-outlined">person</i>
    </div>
  );
};

export default InputField;
