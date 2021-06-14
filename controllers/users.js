import constants from '../constants/constantes.js';
import queryExecutor from '../dataBase/dataBase.js';
import queries from '../dataBase/userQueries.js';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode, } from 'http-status-codes';


export const getUsers = async function (req, res, next) {
    try {
        const users = await queryExecutor(queries.getUsers());
        if (users.rowCount == 0) {
            res.status(StatusCodes.OK).json({ message: constants.NO_USERS_YET })
        } else {
            res.status(StatusCodes.OK).send(users.rows);
        }
    }
    catch (error) {
        next(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ status: 'error', message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};

export const getUser = async function (req, res, next) {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(StatusCodes.BAD_REQUEST).json({ status: 'error', message: constants.ID_MUST_BE_NUMBER }).send();
    } else {
        try {
            const user = await queryExecutor(queries.getUser(id));
            if (user.rowCount == 0) {
                res.status(StatusCodes.BAD_REQUEST).json({ status: 'error', message: constants.USER_NOT_FOUND }).send();
            } else {
                res.send(user.rows);
            }
        } catch (error) {
            next(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({ status: 'error', message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
        };
    }
};

export const createUsers = async function (req, res, next) {
    let { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age) {
        res.status(StatusCodes.BAD_REQUEST).json({ status: 'error', message: constants.MISSING_REQUESTED_FIELDS })
            .send();
    } else {
        try {
            const user = { firstName, lastName, age };
            await queryExecutor(queries.createUser(user.firstName, user.lastName, user.age));
            res.status(StatusCodes.CREATED).json({ message: `${constants.USER_SUCCESFULLY_CREATED}`, user })
                .send();
        } catch (error) {
            next(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({ status: 'error', message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
        };
    }
};

export const deleteUser = async function (req, res, next) {
    const id = req.params.id;
    try {
        const userToBeDeleted = await queryExecutor(queries.deleteUser(id));
        if (userToBeDeleted.rowCount == 0) {
            res.status(StatusCodes.BAD_REQUEST).json({ status: 'error', message: constants.FAILED_DELETE });
        } else {
            res.status(StatusCodes.OK).json({ status: 'success', message: `${constants.SUCCESS_DELETE} ${id}` });
        }
    } catch (error) {
        next(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ status: 'error', message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    };
};

export const updateUser = async function (req, res, next) {
    const id = req.params.id;
    let { firstName, lastName, age } = req.body;
    try {
        const userToBeUpdated = await queryExecutor(queries.getUser(id));
        if (userToBeUpdated.rowCount == 0) {
            res.status(StatusCodes.BAD_REQUEST).json({ status: 'error', message: constants.FAILED_UPDATE }).send();
        } else {
            if (firstName || lastName || age) {
                if (!firstName) firstName = userToBeUpdated.rows[0].firstname;
                if (!lastName) lastName = userToBeUpdated.rows[0].lastname;
                if (!age) age = userToBeUpdated.rows[0].age;
                await queryExecutor(queries.updateUser(firstName, lastName, age, id));
                res.status(StatusCodes.OK).json({ status: 'success', message: constants.SUCCESS_UPDATE}).send();
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ status: 'error', message: constants.WRONG_DATA }).send();
            }
        }
    } catch (error) {
        next(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ status: 'error', message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}

export const deleteUsers = async function (req, res, next) {
    try {
        await queryExecutor(queries.deleteUsers());
        res.status(StatusCodes.OK).json({status: 'succes', messag: constants.USERS_DELETED}).send();
    } catch (error) {
        next(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: 'error', message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });   
    }
}
