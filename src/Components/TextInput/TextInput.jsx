import P from 'prop-types';
import './textinput.css';

export const TextInput = ({ placeholder, value, handleChange, typeInput = "text", className = "text-input" }) => {
  return (
    <input
      className={className}
      onChange={(e) => handleChange(e.target.value.toUpperCase())}
      value={value}
      type={typeInput}
      placeholder={placeholder}
    />
  );
};

TextInput.propTypes = {
  value: P.string.isRequired,
  placeholder: P.string.isRequired,
  handleChange: P.func.isRequired,
  typeInput: P.string.isRequired,
};
