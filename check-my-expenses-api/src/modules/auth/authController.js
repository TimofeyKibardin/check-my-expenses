import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from "../../models/User.js";
import Role from "../../models/Role.js";
import { secret } from '../../config/config.js';

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, secret, { expiresIn: "2h" });
}

class AuthController {
    async registration(req, res) {
        try {
            // Check if body exists and it's an object
            if (!req.body || typeof req.body !== "object") {
                return res.status(400).json({ message: "Empty or invalid body" });
            }

            // Get login and password
            const { login, password } = req.body;
            if (!login || !password) {
                return res.status(400).json({ message: "login and password are required" });
            }

            // User already exists
            const candidate = await User.findOne({login});
            if (candidate) {
                return res.status(400).json({message: 'User with this login already exists'});
            }

            // New user
            const userRole = await Role.findOne({code: "USER"});
            const user = new User({
                login,
                password_hash: bcryptjs.hashSync(password, 7),
                roles: [userRole.code]
            });
            await user.save();

            return res.status(201).json({message: 'New user created'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req, res) {
        try {
            // Check if body exists and it's an object
            if (!req.body || typeof req.body !== "object") {
                return res.status(400).json({ message: "Empty or invalid body" });
            }

            // Get login and password
            const { login, password } = req.body;
            if (!login || !password) {
                return res.status(400).json({ message: "login and password are required" });
            }

            // Find user
            const user = await User.findOne({login});
            if (!user) {
                return res.status(401).json({message: 'User not found'});
            }

            // Check password
            const validPassword = bcryptjs.compareSync(password, user.password_hash);
            if (!validPassword) {
                return res.status(401).json({message: 'Incorrect password'});
            }

            // Token
            const token = generateAccessToken(user._id, user.roles);

            return res.status(200).json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'getUsers error'});
        }
    }
}

export default new AuthController();