import P from 'prop-types';
import './button.css';

export const Button = ({ text, onClick, className = 'button' }) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
);


Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
};
