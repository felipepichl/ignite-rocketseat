"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourses = void 0;
const CreateCoursesServices_1 = __importDefault(require("./CreateCoursesServices"));
function createCourses(request, response) {
    CreateCoursesServices_1.default.execute({
        name: "NodeJS",
        duration: 10,
        educator: "Dani",
    });
    CreateCoursesServices_1.default.execute({
        name: "ReactJS",
        educator: "Diego",
    });
    return response.send();
}
exports.createCourses = createCourses;
