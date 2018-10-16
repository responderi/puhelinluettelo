import React from 'react'

const AddPerson = ({ statusName, statusNumber, changeNumber, changeName, add }) => (
    <div>
        <h2>Lisää uusi</h2>
        <form onSubmit={add}>
            <div>
                nimi: <input
                    value={statusName}
                    onChange={changeName}
                />
            </div>
            <div>
                numero: <input
                    value={statusNumber}
                    onChange={changeNumber}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    </div>
)

export default AddPerson