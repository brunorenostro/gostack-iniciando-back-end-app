/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Router, response, request } from 'express';
import { getCustomRepository } from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies

import { parseISO } from 'date-fns';
import Appointment from '../models/Appointment';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';



const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

const appointments: Appointment[] = [];
appointmentsRouter.get('/', async (request, response) => {
    console.log(request.user);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});


appointmentsRouter.post('/', async (request, response) => {
    try {

        const { provider_id, date } = request.body;
        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const Appointment = await createAppointment.execute({ date: parsedDate, provider_id });
        return response.json(Appointment);

    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }

});


appointmentsRouter.post('/:id', (request, response) => {
    const id = request.params;
    return response.json({ message: id });
});

export default appointmentsRouter;
