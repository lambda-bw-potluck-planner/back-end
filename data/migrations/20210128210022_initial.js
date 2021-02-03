
exports.up = async function(knex) {
  await knex.schema
    .createTable('users',(table) => {
        table.increments('id')
        table.text('fullName').notNullable()
        table.text('username').notNullable().unique()
        table.text('password').notNullable()
        table.text('email').notNullable()
        // table.boolean('organizer').defaultTo(false)
  })
    .createTable('potlucks',(table) => {
        table.increments('id')
        // table.integer('organizerId').notNullable().references('id').inTable('users')
        table.text('eventName').notNullable()
        table.text('date').notNullable()
        table.text('time').notNullable()
        table.text('address').notNullable()
})
    .createTable('invitations',(table) => {
      table.increments('id')
      table.integer('inviter').notNullable().references('id').inTable('users')
      table.text('invitee').notNullable().unique()
      table.integer('potluckId').notNullable().references('id').inTable('potlucks')
      table.boolean('attending').notNullable().defaultTo(false)
    })
    .createTable('itemsList',(table) => {
      table.increments('id')
      // table.text('inviteId').notNullable().references('id').inTable('invitations')
      table.integer('organizer').notNullable().references('id').inTable('users')
      // table.text('attendee').notNullable().references('invitee').inTable('invitations')
      table.integer('potluckId').notNullable().references('id').inTable('potlucks')
      table.text('item').notNullable().unique()
      // table.primary(["inviteId", "potluckId"])
    })
    // .createTable('users_potlucks',(table) => {
      // table.text('inviteId').notNullable().references('id').inTable('invitations')
      // table.text('organizer').notNullable().references('username').inTable('users')
      // table.integer('guestId').notNullable().references('id').inTable('invitations')
      // table.integer('potluckId').notNullable().references('potluckId').inTable('itemsList')
      // table.integer('itemId').notNullable().references('id').inTable('itemsList')
      // table.primary(["inviteId", "potluckId"])
    // })
  }


exports.down = async function(knex) {
  await knex.schema
  // .dropTableIfExists('users_potlucks')
  .dropTableIfExists('items')
  .dropTableIfExists('itemsList')
  .dropTableIfExists('invitations')
  .dropTableIfExists('potlucks') 
  .dropTableIfExists('users')   
};
