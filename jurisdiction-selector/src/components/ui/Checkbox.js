import React from 'react';

const Checkbox = ({label, checked, onChange, className}) => (
  <label className={`flex items-center space-x-2 cursor-pointer ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-4 w-4 text-slate-800 border-2 rounded-sm transition duration-150 ease-in-out"
    />
    <span className="text-slate-700 font-medium">{label}</span>
  </label>
);

export default Checkbox;
