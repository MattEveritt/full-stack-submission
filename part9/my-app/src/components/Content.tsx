import React from 'react';
import Part from './Part';

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

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart

const Content = ({courseParts}: {courseParts: Array<CoursePart>}) => {
  return (
    <div>
      <Part courseParts={courseParts}/>
    </div>
  )
}

export default Content
