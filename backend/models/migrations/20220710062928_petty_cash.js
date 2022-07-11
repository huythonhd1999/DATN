
exports.up = function (knex) {
    return knex.schema.createTable('Petty_Cash', table => {
        table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
        table.integer('type').notNullable(); //1 la khoan thu 2 la khoan chi
        table.integer('userId').notNullable();
        table.string('notes', 256).notNullable();
        table.integer('amount').notNullable();
        table.integer('status').notNullable().defaultTo(1) //1: active 0: deleted;
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('Petty_Cash');
};