import express from 'express'
import { UserModel } from '../models/user.js'
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

const Register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        const userExist = await UserModel.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                errors: [{ msg: 'User email Already existed!!' }]
            })
        }
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = new UserModel({ name, email, password: hashPassword })
        const result = await newUser.save()
        result._doc.password = undefined;
        return res.status(201).json({ success: true, ...result._doc })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}

const Login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const userExist = await UserModel.findOne({ email })
        if (!userExist) {
            return res.status(400).json({
                errors: [{ msg: 'User not registered, Please confirm email or create an account!' }]
            })
        }
        const isUserPassword = await bcrypt.compare(password, userExist.password);
        if (!isUserPassword) {
            return res.status(400).json({
                errors: [{ msg: 'Password is not correct' }]
            })
        }
        const token = jwt.sign({ _id: userExist.id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" })

        const user = { ...userExist._doc, password: undefined };
        return res.status(201).json({ success: true, user, token })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}

const Auth = (req, res) => {
    return res.status(200).json({ success: true, user: { ...req.user._doc } })
}

export { Register, Login, Auth } 
