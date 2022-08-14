
exports.up = function (knex) {
    return knex.schema.createTable('Product', table => {
        table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
        table.integer('taxId');
        table.integer('categoryId');
        table.string('name', 256).notNullable();
        table.integer('price').notNullable();
        table.integer('status').notNullable().defaultTo(1) //1: active 0: deleted, 2 la variant;
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Product');
};