
exports.up = function(knex) {
    return knex.schema.createTable('Store', table => {
        table.specificType('Id', 'int(10) AUTO_INCREMENT primary key').notNullable();
        table.string('restaurantName', 256).notNullable();
        table.string('address', 256).notNullable();
        table.string('websiteLink', 256).notNullable();
        table.string('facebookLink', 256).notNullable();
        table.string('ownerName', 256).notNullable();
        table.string('email', 256).notNullable();
        table.string('mobilePhoneNumber', 256).notNullable();
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('Store');
};
