/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('Employee', tbl=>{
        tbl.string('Role')
            .notNullable()
            .defaultTo("Admin");
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('Employee', tbl=>{
        tbl.dropColumns(['Role']);
    })
};
