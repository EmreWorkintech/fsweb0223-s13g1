const db = require('../../data/db-config');


async function getAll() {
    //select * from Employee;
    //const employee_v1 = await db.select('*').from('Employee');
    const employee_v2 = await db('Employee').orderBy('FirstName', 'desc');

    //select * from Employee limit 1;
    //const employee_v1 = await db.select('*').from('Employee').limit(1);

    //select * from Employee limit 2,3;
    const employee_v3 = await db('Employee').limit(3).offset(2);

    return employee_v2;
}

async function getById(id) {

    const result = await db('Employee').where('Id', id).select('FirstName as Adı', 'LastName as Soyadı').first();  //resolves to an object
    return result;
}


async function getByFilter(filter) {
    // db('Employee').where('id', 5);
    // db('Employee').where('id', '=', 5);
    // db('Employee').where({id:5});    // filter={id:5}
    const result = await db('Employee').where(filter);   //resolves to an array [] collection
    return result;
}


async function create(payload) {
    const [id] = await db('Employee').insert(payload);
    const newEmployee = await getById(id);
    return newEmployee;
}

async function update(payload, id) {
    const rows = await db('Employee').where('id',id).update(payload);
    return rows;
}

async function remove(id) {
    const rows = await db('Employee').where('id',id).delete();
    return rows;
}

module.exports = {
    getAll,
    getById,
    getByFilter,
    create,
    update,
    remove,
}