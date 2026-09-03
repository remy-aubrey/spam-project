/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('gallery', (table) => {
    table.increments('id').primary()
    table.string('user_id').references('users.auth0_id').onDelete('CASCADE')
    table.string('image_url').notNullable()
    table.string('caption')
    table.timestamp('upload_date').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('gallery')
}
