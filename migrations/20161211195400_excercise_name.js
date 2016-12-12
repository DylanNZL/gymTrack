
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('exercise_name', function (table) {
            table.increments('_id');
            table.string('name').unique();
            table.integer('target_id');
        })
    ])
};

exports.down = function(knex, Promise) {
  
};
