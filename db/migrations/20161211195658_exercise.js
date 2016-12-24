
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('exercise', function (table) {
            table.integer('name_id');
            table.integer('s');
            table.integer('r');
            table.integer('w');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('modified_at').defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function(knex, Promise) {
  
};