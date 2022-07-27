
exports.up = function (knex) {
    return knex.schema.createTable('Booking_Order', table => {
        table.integer('orderId').notNullable();
        table.integer('isDoorDelivery').notNullable();
        table.timestamp('deliveryDate').notNullable();
        table.integer('bookingAdvance').notNullable();
        table.string('notes');
        table.primary('orderId')
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Booking_Order');
};