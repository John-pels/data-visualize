import React, { FC } from 'react'
import { ISelectBox } from '../../@types'
import './style.css'

const SelectBox: FC<ISelectBox> = ({ onChange, value, name, options }) => {
    return (
        <select
            className='select-box'
            onChange={onChange}
            value={value}
            name={name}
        >
            {
                React.Children.toArray(options?.map(({ code, name }) => (
                    <option value={code}>{`${name} (${code})`}</option>
                )))
            }
        </select>
    )
}

export { SelectBox }
