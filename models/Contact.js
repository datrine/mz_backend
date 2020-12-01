const bookshelf = require("../conn")
let knex = bookshelf.knex;

knex.schema./*dropTableIfExists("users").*/hasTable('contacts').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable("contacts", function (table) {
            table.increments("id")
            table.uuid("userUUID");
            table.string("contactUUID").unique("contactUsername");
            table.string("contactUUID").unique("contactUUID");
            table.dateTime("date_created", { precision: 6 }).defaultTo(knex.fn.now(6));
        });
    }
    knex.select().table("contacts").then(contacts => {
        console.log(contacts)
    }).catch(err => { console.log(err) });
    console.log("table exists..." + exists);
    console.log(exists);
});

const Contacts = bookshelf.model("Contacts", {
    tableName: "contacts"
})

module.exports = Contacts;