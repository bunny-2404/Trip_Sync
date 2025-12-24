
import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

export const registerUser = async (req: Request, res: Response) => {
    const { name, phone, password, twoWheelers, fourWheelers } = req.body;

    if (!name || !phone || !password) {
        return res.status(400).json({ message: 'Please include all fields' });
    }

    try {
        const userExists = await User.findOne({ phone });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            phone,
            password,
            twoWheelers: twoWheelers || [],
            fourWheelers: fourWheelers || [],
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                phone: user.phone,
                twoWheelers: user.twoWheelers,
                fourWheelers: user.fourWheelers,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { phone, password } = req.body;

    try {
        const user: any = await User.findOne({ phone });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                phone: user.phone,
                twoWheelers: user.twoWheelers,
                fourWheelers: user.fourWheelers,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(401).json({ message: 'Invalid phone or password' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
