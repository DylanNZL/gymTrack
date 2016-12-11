
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('exercise', function (table) {
            table.integer('name_id');
            table.timestamp('timestamp');
            table.integer('mSet');
            table.integer('reps');
            table.integer('weight');
        })
    ])
};

exports.down = function(knex, Promise) {
  
};