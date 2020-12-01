const bookshelf = require("../conn")
let knex = bookshelf.knex;

knex.schema./*dropTableIfExists("users").*/hasTable('users').then(function (exists) {
    if (!exists) {
        console.log("jkhjklhh")
        return knex.schema.createTable("users", function (table) {
            table.string("f_name", 100);
            table.string("l_name", 100);
            table.string("m_name", 100);
            table.string("gender", 100);
            table.string("username", 100).unique("username");
            table.string("password", 100);
            table.string("email").unique("email");
            table.dateTime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
            table.date("dob");
            table.json("avatarInfo");
        }).alterTable("users", function (table) {
            table.increments("id")
            table.uuid("userUUID");
        });
    }
    knex.select().table("users").then(users => {
        console.log(users)
    }).catch(err => { console.log(err) });
    console.log("table exists..." + exists);
    console.log(exists);
});

const User = bookshelf.model("User", {
    tableName: "users"
})

module.exports = User;