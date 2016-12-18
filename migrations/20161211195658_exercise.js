
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('exercise', function (table) {
            table.integer('name_id');
            table.timestamp('timestamp');
            table.integer('s');
            table.integer('r');
            table.integer('w');
        })
    ])
};

exports.down = function(knex, Promise) {
  
};