
exports.up = async function(knex) {
  await knex.schema
    .createTable('users',(table)=>{
        table.increments('id')
        table.text('name').notNullable()
        table.text('username').notNullable().unique()
        table.text('password').notNullable()
        table.text('email').notNullable()
        table.boolean('organizer').defaultTo(false)
        table.integer('potluckId').notNullable()
  })
    .createTable('potlucks',(table)=>{
        table.increments('id')
        table.integer('organizerId').notNullable().references('id').inTable('users')
        table.text('eventname').notNullable()
        table.text('date').notNullable()
        table.text('time').notNullable()
        table.text('address').notNullable()
})
    .createTable('users-potlucks',(table)=>{

})


exports.down = function(knex) {
  
};
