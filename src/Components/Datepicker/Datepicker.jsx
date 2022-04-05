import './datepicker.css'

export const Datepicker = ({ value, onChange }) => {
    return (
        <input type="date" className='date' value={value} onChange={(e) => onChange(e.target.value)} />
    )
}

