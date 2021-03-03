import React, { useState } from 'react'


const SuitabilityControls = (props) => {
    const [value, setValue] = useState('')

    return (
        <div className="p-5">
            <label>
                <input type="range" />
                Crimes
            </label>
            <label>
                <input type="range" />
                Schools
            </label>
            <label>
                <input type="range" />
                Travel time to ...
            </label>
            <label>
                <input type="range" />
                Cafes
            </label>
        </div>
    )
}

export default SuitabilityControls
