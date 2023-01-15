interface CourseProps {
	name: string;
  exerciseCount: number;
}

const Course = (props: CourseProps) => (
  <p>
    {props.name} {props.exerciseCount}
  </p>
);

interface ContentProps {
  courseParts: Array<CourseProps>;
}

const Content = (props: ContentProps) => {
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