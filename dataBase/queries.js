const getUsers = () => {
    return  `SELECT * FROM users ORDER BY id ASC`;
};

const createUser = (firstName, lastName, age) => {
    return  `INSERT INTO users (firstname, lastname, age) VALUES ('${firstName}', '${lastName}', '${age}')`;
};

const getUser = (id) => {
    return  `SELECT * FROM users WHERE id = ${id}`;
}

const deleteUser = (id) => {
    return `DELETE FROM users WHERE id = ${id}`;
}

const updateUser = (firstName, lastName, age, id) => {
    return `UPDATE users SET firstname = '${firstName}' , lastname = '${lastName}' , age = ${age} WHERE ID = ${id}`;
}

export default {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser
}