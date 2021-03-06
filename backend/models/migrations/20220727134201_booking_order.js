
exports.up = function (knex) {
    return knex.schema.createTable('Booking_Order', table => {
        table.integer('orderId').notNullable();
        table.integer('isDoorDelivery').notNullable(); //1 la true 2 la false
        table.timestamp('deliveryDate').notNullable();
        table.integer('bookingAdvance').notNullable();
        table.string('notes');
        table.primary('orderId')
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Booking_Order');
};