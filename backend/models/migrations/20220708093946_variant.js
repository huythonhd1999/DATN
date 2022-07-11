
exports.up = function (knex) {
    return knex.schema.createTable('Variant', table => {
        table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
        table.string('name', 256).notNullable();
        table.integer('price').notNullable();
        table.integer('variantGroupId');
        table.integer('status').notNullable().defaultTo(1) //1: active 0: deleted; 2 la base variant cua product nao do
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Variant');
};
