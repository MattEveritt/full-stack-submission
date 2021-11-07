import React from 'react'

interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface BaseAndDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends BaseAndDescription {
  type: 'normal'
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends BaseAndDescription {
  type: 'submission'
  exerciseSubmissionLink: string
}

interface CourseSpecialPart extends BaseAndDescription {
  type: 'special'
  requirements: Array<string>
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart

const Part = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  return (
    <div>
      {courseParts.map((part) => {
        switch (part.type) {
          case 'normal':
            return (
              <div>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>{part.description}</p>
              </div>
            )
          case 'groupProject':
            return (
              <div>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>project exercises {part.groupProjectCount}</p>
              </div>
            )
          case 'submission':
            return (
              <div>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>{part.description}</p>
                <p>submit to {part.exerciseSubmissionLink}</p>
              </div>
            )
          case 'special':
            return (
            <div>
              <h3>
                {part.name} {part.exerciseCount}
              </h3>
              <p>{part.description}</p>
              <p>required skills: {part.requirements.map((r, i) => <span key={r}>{ i ? ', ' : ''}{r} </span>)}</p>
            </div>
            )
          default:
            return assertNever(part)
        }
      })}
    </div>
  )
}

export default Part
