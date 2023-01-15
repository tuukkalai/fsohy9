export interface HeaderProps {
  courseName: string;
}

export interface CourseProps {
  name: string;
  exerciseCount: number;
}

export interface CourseParts {
  courseParts: Array<CourseProps>;
}