exports.up = function (knex) {
    return knex.schema.createTable('Order_Item_Addon', table => {
        table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
        table.integer('orderItemId').notNullable();
        table.integer('addonId');
        table.integer('quantity');
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Order_Item_Addon');
};