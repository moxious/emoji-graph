/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const emoji = require('../../web/src/emoji.json')
const stories = require('./seed-stories.json');
const fs = require('fs');
const csv = require('csv-parser');

dotenv.config()
const db = new PrismaClient()

async function main() {
  // Seed data is database data that needs to exist for your app to run.
  // Ideally this file should be idempotent: running it multiple times
  // will result in the same database state (usually by checking for the
  // existence of a record before trying to create it). For example:
  //

  const st = await db.story.findMany({ first: 1 })
    .catch(err => console.error('Locate error',err));

  if (!st.length) {
    for (let i=0; i<stories.length; i++) {
      await db.story.create({
        data: stories[i],
      }).catch(err => console.error('ZOMG', stories[i], err));
    }
  }

  const existing = await db.emoji.findMany({ first: 1 })
    .catch(err => console.error('Locate error',err))

  const buf = emoji;
  if (!existing.length) {

    for (let i=0; i<buf.length; i++) {
      // buf[i].column_a = Number(buf[i].column_a);
      delete(buf[i].column_a);
      const result = await db.emoji.create({
        data: buf[i],
      }).catch(err => console.error('ZOMG',buf[i],err));
    }
  } else {
    console.info('No data to seed. See api/prisma/seeds.js for info.')
  }

  console.log('Done');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.disconnect()
  })
