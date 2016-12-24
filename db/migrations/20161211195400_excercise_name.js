
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('exercise_name', function (table) {
            table.increments('_id');
            table.string('name').unique();
            table.integer('target_id');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('modified_at').defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function(knex, Promise) {
  
};
