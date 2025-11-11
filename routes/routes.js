import express from 'express'
import { Register, Login, Auth } from '../controller/userController.js';
import { body } from 'express-validator';
import { VerifyUser } from '../middleware/VerifyUser.js';
import { createContact, getContacts, getContact, updateContact, deleteContact } from '../controller/contactController.js';
const router = express.Router();
// User Registration Route
router.post('/register', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address!!!'),
    body('password').trim().notEmpty().withMessage('Passwoed is required').isLength({ min: 8, max: 25 }).withMessage('Password must be at least 8 to 30 characters long ')
], Register)
// User Login Route
router.post('/login', [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address!!!'),
    body('password').trim().notEmpty().withMessage('Passwoed is required').isLength({ min: 8, max: 25 }).withMessage('Password must be at least 8 to 30 characters long ')
], Login)
// Verify User Route
router.get('/verify', VerifyUser, Auth);

// Contact Management Routes 
router.post('/add-contact', VerifyUser, createContact)
router.get('/contacts', VerifyUser, getContacts);
router.get('/contact/:id', VerifyUser, getContact);
router.put('/update-contact/:id', VerifyUser, updateContact);
router.delete('/contact/:id', VerifyUser, deleteContact);

export { router as Router }