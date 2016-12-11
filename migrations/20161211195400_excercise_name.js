
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('exercise_name', function (table) {
            table.increments('_id');
            table.timestamp('timestamp');
            table.string('name').unique();
        })
    ])
};

exports.down = function(knex, Promise) {
  
};
