import { CourseParts } from "../types";
import Part from "./Part";

const Content = (props: CourseParts) => {
  const courses = props.courseParts;
  return (
    <div>
      {courses.map( (c,i) => (
        <Part key={i} course={c} />
      ))}
    </div>
  );
};

export default Content;