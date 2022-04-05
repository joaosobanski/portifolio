
import './grid.css'

export const TableValues = ({ values, onClick }) => {
    return (
        <div className="divrow" onClick={onClick}>
            {
                values.map((item, i) =>
                    <label className="tablecol">
                        {item}
                    </label>
                )
            }
        </div>
    )
}