export interface HeaderProps {
  courseName: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourseWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CourseWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

export interface CourseParts {
  courseParts: Array<CoursePart>;
}

// interface CoursePartBase {
//   name: string;
//   exerciseCount: number;
//   type: string;
// }

// interface CourseNormalPart extends CoursePartBase {
//   type: "normal";
//   description: string;
// }

// interface CourseProjectPart extends CoursePartBase {
//   type: "groupProject";
//   groupProjectCount: number;
// }

// interface CourseSubmissionPart extends CoursePartBase {
//   type: "submission";
//   description: string;
//   exerciseSubmissionLink: string;
// }

interface CourseSpecialPart extends CourseWithDescription {
  kind: "special";
  requirements: Array<string>;
}

export type CoursePart = 
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CourseSpecialPart;
