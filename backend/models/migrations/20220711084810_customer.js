
exports.up = function (knex) {
    return knex.schema.createTable('Customer', table => {
        table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
        table.string('name',256).notNullable();
        table.string('mobilePhone',256).notNullable();
        table.string('email', 256);
        table.string('shippingAddress', 256);
        table.integer('status').notNullable().defaultTo(1) //1: active 0: deleted;
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Customer');
};