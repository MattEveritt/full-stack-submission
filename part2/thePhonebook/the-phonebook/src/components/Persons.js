import React from 'react'

const Persons = (props) => {
    return (
        <div>
        {props.persons.filter(person => 
            person.name.toLocaleLowerCase().indexOf(props.newSearch.toLowerCase()) !== -1)
            .map(person => 
            <h3 key={person.id}>
                {person.name} 
                {person.number}
                <button value={person.id} onClick={props.handleDeletePerson}>delete</button>
            </h3>
            )
        }
        </div>
    )
}

export default Persons