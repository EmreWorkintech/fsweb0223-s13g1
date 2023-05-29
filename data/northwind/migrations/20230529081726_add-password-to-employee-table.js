/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('Employee', tbl=>{
    tbl.string('Password')
        .notNullable()
        .defaultTo("1234");
    tbl.string('Email')
        .notNullable()
        .defaultTo("null@wit.com.tr");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('Employee', tbl=>{
        tbl.dropColumns(['Email', 'Password']);
    })
  
};
