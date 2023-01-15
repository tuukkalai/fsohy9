import { CourseParts } from "../types";

const Total = (props: CourseParts) => {
  return (
    <>
      <hr />
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
}

export default Total;