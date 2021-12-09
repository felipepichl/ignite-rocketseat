
interface Course {
  name: string;
  duration: number;
  educator: string;
}

class CreateCourseServices {
  execute({name, duration, educator}: Course){
    console.log(name, duration, educator);
  };
};

export { CreateCourseServices }