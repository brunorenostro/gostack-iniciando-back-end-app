import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;
        const authenticateUser = new AuthenticateUserService();
        const { user, token } = await authenticateUser.execute({
            email,
            password,
            token,
        });

        return response.json({ user, token });
    } catch (err) {
        return response.json({ error: err.message });
    }
});

export default sessionsRouter;
