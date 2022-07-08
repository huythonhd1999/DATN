exports.up = function (knex) {
    return knex.schema.createTable('User', table => {
        table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
        table.string('userName', 256).notNullable();
        table.string('password', 256).notNullable();
        table.integer('userType').notNullable().defaultTo(1); //1 is admin, 2 is user
        table.integer('status').notNullable().defaultTo(1); //1 is active, 0 is deleted
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('User');
};
