interface CourseProps {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  courseParts: Array<CourseProps>;
}

const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

export default Total;