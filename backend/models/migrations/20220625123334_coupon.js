exports.up = function (knex) {
    return knex.schema.createTable('Coupon', table => {
        table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
        table.string('code', 256).notNullable();
        table.integer('type').notNullable(); //0 là Percent, 1 là Fix amount
        table.integer('amount').notNullable();
        table.integer('status').notNullable().defaultTo(1) //1: active 0: deleted;;
        table.integer('minimumOrderValue').notNullable();
        table.dateTime('startTime');
        table.dateTime('endTime');
        table.string('dayOfWeek'); // 0 là Monday, 1 là Tuesday,... 
        table.time('startHappyHour');
        table.time('endHappyHour');

    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Coupon');
};
