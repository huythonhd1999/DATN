
exports.up = function (knex) {
    return knex.schema.createTable('Immediate_Sale_Order', table => {
        table.integer('orderId').notNullable();
        table.string('notes').notNullable()
        table.primary('orderId')
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Immediate_Sale_Order');
};