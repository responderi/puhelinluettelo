import React from 'react'

const Filter = ({ status, change }) => (
    <div>
        rajaa näytettäviä <input
            value={status}
            onChange={change}
        />
    </div>
)

export default Filter