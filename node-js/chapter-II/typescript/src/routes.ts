import { Request, Response } from 'express';

import  CreateCoursesServices  from './CreateCoursesServices';

export function createCourses(request: Request, response: Response) {
  
  CreateCoursesServices.execute({
    name: "NodeJS",
    duration: 10,
    educator: "Dani",
  });

  CreateCoursesServices.execute({
    name: "ReactJS",
    educator: "Diego",
  });

  return response.send();
}