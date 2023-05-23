/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Users', tbl=>{
    /* 
    USERS
    id:(integer) autoincrement = primary key, not null
    firstName:(string) not null, 64 karakter küçük
    lastName: (string) not null, 128 karakterden küçük
    email: (string) not null, unique
    password: (string) not null
    role*: (string) not null, default(User)
    coin: (decimal) default(0), unsigned, not null
    */
    tbl.increments();//id olarak isimlendirir.
    tbl.string('firstName',64)
        .notNullable();
    tbl.string('lastName',128)
        .notNullable();
    tbl.string('email')  //karakter sınırı koymadık
        .notNullable()
        .unique();
    tbl.string('password')
        .notNullable();
    tbl.string('role')
        .notNullable()
        .defaultTo('User');
    tbl.decimal('coin')
        .notNullable()
        .unsigned()
        .defaultTo(0);
}).createTable('Hobbits', tbl=>{
     /* 
 HOBBİTS
    id:(integer) autoincrement, primary key
    name:(string) not null, 64 karakter küçük, unique
*/

    tbl.increments('hobbitId');
    tbl.string('firstName',64)
        .notNullable()
        .unique();
})
    
};

 /* 
 HOBBİTS
    id:(integer) autoincrement, primary key
    name:(string) not null, 64 karakter küçük, unique
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Hobbits')
                    .dropTableIfExists('Users')
};
