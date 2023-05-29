
interface ICreateCourses {
  name: string,
  duration?: number,
  educator: string,
}

class CreateCoursesServices {
  execute({ name, duration  = 8, educator }: ICreateCourses){
    console.log('====================================');
    console.log(name, duration, educator);
    console.log('====================================');
  }
}

export default new  CreateCoursesServices();