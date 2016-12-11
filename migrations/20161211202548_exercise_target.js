
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('exercise_target', function (table) {
            table.increments('_id');
            table.string('target').unique();
        })
    ])
};

exports.down = function(knex, Promise) {
  
};
