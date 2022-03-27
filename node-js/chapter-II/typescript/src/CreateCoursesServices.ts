
interface ICreateCourses {
  name: string,
  duration: number,
  educator: string,
}

class CreateCoursesServices {
  execute({ name, duration, educator }: ICreateCourses){
    console.log('====================================');
    console.log(name, duration, educator);
    console.log('====================================');
  }
}

export default new  CreateCoursesServices();