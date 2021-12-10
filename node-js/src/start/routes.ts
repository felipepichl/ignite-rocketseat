import { Request, Response } from 'express'

import { CreateCourseServices } from './CreateCourseServices'

function createCourse(request: Request, response: Response) {
  const services = new CreateCourseServices();

  services.execute({
    name: 'Node-JS',
    duration: 10,
    educator: 'Dani'
  });

  services.execute({
    name: 'React-JS',
    educator: 'Diego'
  });
}

export { createCourse }