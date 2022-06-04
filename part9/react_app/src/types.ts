export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartDescriptive extends CoursePartBase {
  description: string
}

export interface CourseNormalPart extends CoursePartDescriptive {
  type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartDescriptive {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseRequiredPart extends CoursePartDescriptive {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequiredPart;