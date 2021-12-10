"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const CreateCourseServices_1 = require("./CreateCourseServices");
function createCourse(request, response) {
    const services = new CreateCourseServices_1.CreateCourseServices();
    services.execute({
        name: 'Node-JS',
        duration: 10,
        educator: 'Dani'
    });
    services.execute({
        name: 'React-JS',
        // duration: 10,
        educator: 'Diego'
    });
}
exports.createCourse = createCourse;
