exports.up = function (knex) {
    return knex.schema.createTable('Order_Item', table => {
        table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
        table.integer('orderId').notNullable();
        table.integer('variantId');
        table.integer('quantity');
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Order_Item');
};