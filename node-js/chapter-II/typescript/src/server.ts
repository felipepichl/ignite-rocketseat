import express from 'express';

const app = express();

import {createCourses} from './routes'

app.get('/', createCourses);

app.listen(3333);