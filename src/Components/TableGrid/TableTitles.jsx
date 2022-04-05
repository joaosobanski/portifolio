

import './grid.css'
export const TableTitles = ({ titles }) => {
    return (
        <div className="divrow">
            {
                titles.map((item, i) =>
                    <label className="tablecol">
                        {item}
                    </label>
                )
            }
        </div>
    )
}