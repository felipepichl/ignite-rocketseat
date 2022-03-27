"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCoursesServices {
    execute({ name, duration, educator }) {
        console.log('====================================');
        console.log(name, duration, educator);
        console.log('====================================');
    }
}
exports.default = new CreateCoursesServices();
