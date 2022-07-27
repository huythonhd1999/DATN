
exports.up = function (knex) {
    return knex.schema.createTable('Canceled_Order', table => {
        table.integer('orderId');
        table.integer('refundAmount').notNullable();
        table.integer('paymentType').notNullable(); //1 la cash 2 la card 3 la other
        table.string('notes').notNullable().defaultTo(1);
        table.primary('orderId')
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Canceled_Order');
};