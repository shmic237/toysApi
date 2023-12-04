const bcrypt = require("bcryptjs");
const { validRegister, validLogin } = require("../validation/userValidation");
const { User } = require("../models/User.model");
const { generateToken } = require("../utils/jwt");

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        next(error)
    }
}

exports.getInfoUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userInfo = await User.findOne({id: id});
        res.send(userInfo);
    } catch (error) {
        next(error)
    }
}

const checkIfUserExists = async (email) => {
    const user = await User.findOne({ email });
    if (user) return true;
    return false;
}

exports.register = async (req, res, next) => {
    const body = req.body;
    try {
        const validate = validRegister(body);
        if (validate.error) {
            throw Error(validate.error)
        }

        if (await checkIfUserExists(body.email)) {
            throw new Error("Email already in system, try log in")
        }

        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;

        const newUser = new User(body);

        await newUser.save();
        newUser.password = "******";

        res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    const body = req.body;
    try {
        const validate = validLogin(body);
        if (validate.error) {
            throw Error(validate.error)
        }

        if (!await checkIfUserExists(body.email)) {
            throw new Error("Email is not in the system")
        }

        const user = await User.findOne({ email: body.email });

        const passwordMatches = await bcrypt.compare(body.password, user.password);
        if (!passwordMatches) {
            throw new Error("Password is worng")
        }

        const token = generateToken(user);

        return res.send({ user, token });
    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    const id = req.params.idDelete;
    const userId = res.locals.user_id;
    try {
        if(userId !== id) {
            throw new Error("you are not the auther")
        }
        const deletedUser = await User.findOneAndDelete({id: userId });
        res.send(deletedUser)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }

}

exports.patchUser = async (req, res, next) => {
    const id = req.params.idEdit;
    const userId = res.locals.user_id;
    const data = req.body;
    const options = { new: true }
    try {
        if(userId !== id) {
            throw new Error("you are not the auther")
        }
        const patchUser = await User.findByIdAndUpdate(userId, data, options);
        res.send(patchUser)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
}