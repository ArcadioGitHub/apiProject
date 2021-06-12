import { v4 as uuidv4 } from 'uuid';
import errors from '../utils/errors.js'
import constants from '../constants/constantes.js'

let users = [];

export const getUsers = (req, res) => {
    res.send(users);
};

export const getUser = (req, res) => {
    const id = req.params.id;
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) {
        throw new errors.NotFound(constants.USER_NOT_FOUND);
    }
    res.send(foundUser);
};

export const createUsers = (req, res, next) => {
    let userId = uuidv4();
    let { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age) {
        throw new errors.BadRequest(constants.MISSING_REQUESTED_FIELDS);
    }
    const user = { firstName, lastName, age };
    const userWithId = { ...user, id: userId };
    try {
        users.push(userWithId);
        res.json({ message: `${constants.USER_SUCCESFULLY_CREATED} ${userWithId.id}` });
        res.send();
    } catch (error) {
        throw new errors.ServerError(`${constants.SERVER_ERROR}, ${error}`);
    };
};

export const deleteUser = (req, res) => {
    const id = req.params.id;
    let userToBeDeleted = users.find((user) => user.id !== id);
    if (!userToBeDeleted) {
        throw new errors.NotFound(constants.FAILED_DELETE);
    }
    try {
        users = users.filter((user) => user.id !== id);
        res.json({ message: `${constants.SUCCESS_DELETE} ${id}` });
        res.send();
    } catch (error) {
        throw new errors.ServerError(`${constants.SERVER_ERROR}, ${error}`);
    };
};

export const updateUser = (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    if (!user) {
        throw new errors.NotFound(constants.USER_NOT_FOUND);
    }
    const { firstName, lastName, age } = req.body;
    if (firstName || lastName || age) {
        try {
            if (firstName) user.firstName = firstName;
            if (lastName) user.lastName = lastName;
            if (age) user.age = age;
            res.json({ message: `${constants.SUCCESS_UPDATE} ${id}` });
            res.send();
        }
        catch (error) {
            throw new errors.ServerError(`${constants.SERVER_ERROR}  ${error}`);
        }
    } else {
        throw new errors.BadRequest(`${constants.WRONG_DATA}`);
    }
};
