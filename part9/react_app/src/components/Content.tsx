import type { CoursePart } from "../types"

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => { 
  return (
    <div>
    {courseParts.map((course, idx) => 
      <p key={idx}>{course.name} {course.exerciseCount}</p>
    )}
    </div>
  )
}

export default Content