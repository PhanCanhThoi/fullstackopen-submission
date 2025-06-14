type CourseProps = {
  name: string;
  id: number;
  parts: {
    name: string;
    exercises: number;
    id: number;
  }[];
};
type CoursePart = {
  name: string;
  exercises: number;
  id: number;
};
const Part = ({ part }: { part: CoursePart }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
const Course = ({ course }: { course: CourseProps }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <strong>
        total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
        exercises
      </strong>
    </div>
  );
};
export default Course;
