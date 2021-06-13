import errors from '../utils/errors.js';
import constants from '../constants/constantes.js';
import queryExecutor from '../dataBase/dataBase.js';
import queries from '../dataBase/queries.js';

export const getUsers = (req, res) => {
    try {
        queryExecutor(queries.getUsers()).then(result => {
            res.send(result.rows)
        }).catch(err => { console.log(err) });
    }
    catch (error) {
        throw new errors.ServerError(`${constants.SERVER_ERROR} ${error}`);
    }
};

export const getUser = (req, res) => {
    const id = req.params.id;
    try {
        queryExecutor(queries.getUser(id)).then(result => {
            if (result.rows.length == 0) {
                res.status(400).json({ status: 'error', message: constants.USER_NOT_FOUND });
            } else {
                res.send(result.rows)
            }
        }).catch(err => { console.log(err) });
    } catch (error) {
        throw new errors.ServerError(`${constants.SERVER_ERROR} ${error}`);
    };

};

export const createUsers = (req, res) => {
    let { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age) {
        throw new errors.BadRequest(constants.MISSING_REQUESTED_FIELDS);
    }
    const user = { firstName, lastName, age };
    try {
        queryExecutor(queries.createUser(user.firstName, user.lastName, user.age))
            .then(() => {
                res.json({ message: `${constants.USER_SUCCESFULLY_CREATED}`, user });
                res.send();
            }).catch(err => { console.log(err) });
    } catch (error) {
        throw new errors.ServerError(`${constants.SERVER_ERROR}, ${error}`);
    };
};

export const deleteUser = (req, res) => {
    const id = req.params.id;
    try {
        queryExecutor(queries.getUser(id)).then(result => {
            if (result.rows.length == 0) res.status(400).json({ status: 'error', message: constants.FAILED_DELETE });
        }).catch(err => { console.log(err) });

        queryExecutor(queries.deleteUser(id))
            .then(() => {
                res.json({ message: `${constants.SUCCESS_DELETE} ${id}` });
                res.send();
            }).catch(err => { console.log(err) });
    } catch (error) {
        throw new errors.ServerError(`${constants.SERVER_ERROR}, ${error}`);
    };
};

export const updateUser = (req, res) => {
    const id = req.params.id;
    try {
        queryExecutor(queries.getUser(id)).then(result => {
            if (result.rows.length == 0) res.status(400).json({ status: 'error', message: constants.FAILED_UPDATE });
        }).catch(err => { console.log(err) });

        let { firstName, lastName, age } = req.body;

        queryExecutor(queries.getUser(id)).then(user => {
            if (firstName || lastName || age) {
                if (!firstName) firstName = user.rows[0].firstname;
                if (!lastName) lastName = user.rows[0].lastname;
                if (!age) age = user.rows[0].age;
                queryExecutor(queries.updateUser(firstName, lastName, age, id)).then(() => {
                    res.json({
                        message: `${constants.SUCCESS_UPDATE}`,
                        firstName: firstName, lastName: lastName, age: age
                    });
                    res.send();
                }).catch(err => { console.log(err) });
            } else {
                res.json({
                    message: `${constants.WRONG_DATA}`
                });
                res.send();
            }
        });
    } catch (error) {
        throw new errors.ServerError(`${constants.SERVER_ERROR}, ${error}`);
    }
}
