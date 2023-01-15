import { CourseParts } from "../types";
import Course from "./Course";

const Content = (props: CourseParts) => {
  const courses = props.courseParts;
  // courses.map(c => console.log(c));
  return (
    <div>
      {courses.map( (c,i) => (
        <Course key={i} course={c} />
      ))}
    </div>
  );
};

export default Content;