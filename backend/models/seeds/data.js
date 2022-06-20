const bcrypt = require('bcrypt')

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('User').del()
        .then(function () {
            // Inserts seed entries
            let saltRounds = 10
            let password = bcrypt.hashSync('a12345678', saltRounds)
            return knex('User').insert([
                {
                    userName: "admin01",
                    password: password,
                    userType: 1,
                    status: 1
                },
            ]);
        });
}
