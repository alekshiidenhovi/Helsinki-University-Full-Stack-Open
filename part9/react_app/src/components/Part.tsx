import { CoursePart } from '../types'

const Part = ({ course }: { course: CoursePart }) => {
  const general = <p><strong>{course.name} {course.exerciseCount}</strong></p>

  switch (course.type) {
    case "normal":
      return (
        <div>
          {general}
          <p><i>{course.description}</i></p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          {general}
          <p>project exercises {course.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div>
          {general}
          <p><i>{course.description}</i></p>
          <p>submit to <a href="#">{course.exerciseSubmissionLink}</a></p>
        </div>
      )
    case "special":
      return (
        <div>
          {general}
          <p><i>{course.description}</i></p>
          <p>required skills: {course.requirements.map(skill => `${skill}, `)}</p>
        </div>
      )
  }
}

export default Part