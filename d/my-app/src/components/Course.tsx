import { CoursePart } from "../types";

interface CourseProps {
  key: number;
	course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Course = ({key, course}: CourseProps) => {
  switch (course.type) {
    case "normal":
      return (
        <div key={key}>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p><i>{course.description}</i></p>
        </div>
      );
    case "groupProject":
      return (
        <div key={key}>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p>Project exercises {course.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div key={key}>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p><i>{course.description}</i></p>
          <p>Submit to {course.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div key={key}>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p><i>{course.description}</i></p>
          <p>Required skills: {course.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(course);
  }
};

export default Course;
