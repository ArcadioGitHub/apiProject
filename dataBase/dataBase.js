import pg from 'pg';

const db = async function (strQuery) {
    let connectionString = 'postgres://developer:newPassword@localhost:5432/api';
    let client = new pg.Client(connectionString);
    await client.connect();
    try {
       return await client.query(strQuery);
    } catch (err) {
        console.log(err.stack);
    } finally {
        client.end();
    }
}

export default db;











