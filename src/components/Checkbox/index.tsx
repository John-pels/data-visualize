import { FC } from "react"
import { ICheckbox } from "../../@types"
import './style.css'

const Checkbox: FC<ICheckbox> = ({ onChange, value, name, id, label }) => {
    return (
        <div className="checkbox__container">
            <input
                type='checkbox'
                className="checkbox"
                onChange={onChange}
                value={value}
                name={name}
                id={id}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}
export { Checkbox }
