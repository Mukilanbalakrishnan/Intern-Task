const express = require('express');
const router = express.Router();

const Applicant = require('../models/Appliants');

router.get('/', async (req, res) => {
    try {
        const applicants = await Applicant.find().sort({ submissionDate: -1 });
        res.json(applicants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    const { name, email, mobile, place, bloodGroup, role, reason } = req.body;

    try {
        const newApplicant = new Applicant({
            name,
            email,
            mobile,
            place,
            bloodGroup,
            role,
            reason
        });

        const applicant = await newApplicant.save();
        res.status(201).json(applicant);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'This email address is already registered.' });
        }

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ msg: messages.join(' ') });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id/status', async (req, res) => {
    try {
        const applicant = await Applicant.findById(req.params.id);

        if (!applicant) {
            return res.status(404).json({ msg: 'Applicant not found' });
        }
        
        applicant.status = req.body.status;
        await applicant.save();
        res.json(applicant);

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Applicant not found' });
        }
        res.status(500).send('Server Error');
    }
});


module.exports = router;
