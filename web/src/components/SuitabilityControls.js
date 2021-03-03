import React, { useState } from 'react'



let features = ['Crimes', "Schools", "Travel Times", "Cafes"]
const SuitabilityControls = (props) => {
    const [value, setValue] = useState('')

    return (
        <div className="p-5">
            {features.map((d, i) =>
                <label>
                    <input type="range" onChange={(e) => {}} />
                    {d}
                </label>
            )}
        </div>
    )
}

export default SuitabilityControls
