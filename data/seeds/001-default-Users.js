/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').truncate()  //del() sadece verileri siler | truncate() veriler + metadata silinir(yani increment son değeri gibi)
  await knex('Users').insert([
    { 
      firstName: 'Emre',
      lastName: "Şahiner",
      email: "emre@wit.com.tr",
      password: "1234",
      role: "User",
      coin: 1000
    },
    { 
      firstName: 'Erdem',
      lastName: "Günay",
      email: "erdem@wit.com.tr",
      password: "1234",
      role: "Admin",
      coin: 1
    }
  ]);
};
