const knex = require("../data/db");
module.exports.up = async (req, res) => {
  await knex.schema.hasTable("tbl_user").then(async (exists) => {
    if (!exists) {
      await knex.schema
        .createTable("tbl_user", async (table) => {
          table.increments("userId");
          table.string("name");
          table.string("email");
          table.string("salt");
          table.string("password");
        })
        .then(() => {
          console.log("User Table created Successfully");
        })
        .catch((err) => console.log(err));
    }
  });
};

module.exports.down = (knex) => knex.schema.dropTable("tbl_user");
