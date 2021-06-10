import { v4 as uuidv4 } from 'uuid';

let users = [];

export const getUsers = (req, res) => {
    res.send(users);
};

export const getUser = (req, res) => {
    const id = req.params.id;
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
};

export const createUsers = (req, res) => {
    let user = req.body;
    const userId = uuidv4();
    const userWithId = {... user, id: userId};
    users.push(userWithId);
    res.send(`The User with name: ${userWithId.firstName} and ID: ${userWithId.id} has been created sucessfully`);
};

export const deleteUser = (req, res) => {
    const id = req.params.id;
    users = users.filter((user) => user.id !== id);
    res.send(`The User with ID: ${id} was succesfully deleted`);
};

export const updateUser = (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id );
    const {firstName, lastName, age} = req.body;
    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age = age;
    res.send(`The user with ID: ${id} has been updated succesfully`);
};