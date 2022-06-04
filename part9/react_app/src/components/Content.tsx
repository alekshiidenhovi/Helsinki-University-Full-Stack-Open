import type { CoursePart } from "../types"
import Part from './Part'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => { 
  return (
    <div className="content">
    {courseParts.map((course, idx) => 
      <Part key={idx} course={course} />
    )}
    </div>
  )
}

export default Content