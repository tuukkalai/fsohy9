import { CourseParts, CourseProps } from "../types";

const Course = (props: CourseProps) => (
  <p>
    {props.name} {props.exerciseCount}
  </p>
);

const Content = (props: CourseParts) => {
  const courses = props.courseParts;
  return (
    <div>
    {courses.map((c,i) => (
      <Course
        key={i}
        name={c.name}
        exerciseCount={c.exerciseCount}
      />
    ))}
    </div>
  );
};

export default Content;