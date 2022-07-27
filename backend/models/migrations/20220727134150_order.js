
exports.up = function (knex) {
    return knex.schema.createTable('Order', table => {
        table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
        table.integer('userId').notNullable();
        table.integer('couponId');
        table.integer('customerId');
        table.integer('paymentType').notNullable(); //1 laf cash 2 la card 3 la other
        table.integer('total');
        table.timestamp('createDate').notNullable().defaultTo(knex.fn.now())
        table.integer('status').notNullable().defaultTo(1); //2 la booking 1 la immediate sale 3 la canceled
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Order');
};