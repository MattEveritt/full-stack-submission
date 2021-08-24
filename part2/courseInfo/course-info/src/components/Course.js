import React from 'react'

const Course = ({ course }) => {
    console.log(course)
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce((s, p) => s + p.exercises, 0)
    return(
      <h3>total of {total} exercises</h3>
    ) 
  }
  
  const Part = (props) => {
    console.log(props.part)
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
    )
  }

  export default Course