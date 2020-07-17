import { Router, response, response } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';

import User from '../models/User';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();
        const user = await createUser.execute({
            name,
            email,
            password,
        });
        delete user.password;
        return response.json(user);
    } catch (err) {
        return response.json({ error: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        console.log(request.file);
        return response.json({ ok: true });
    },
);

usersRouter.get('/', async (request, response) => {
    try {
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        return response.json(users);
    } catch (err) {
        return response.json({ error: err.message });
    }
});

export default usersRouter;
