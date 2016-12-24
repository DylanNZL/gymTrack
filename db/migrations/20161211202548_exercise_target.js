
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('exercise_target', function (table) {
            table.increments('_id');
            table.string('target').unique();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('modified_at').defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function(knex, Promise) {
  
};
