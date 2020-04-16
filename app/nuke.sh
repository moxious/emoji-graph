#!/bin/bash
rm api/prisma/dev.db
yarn rw db generate && yarn rw db up
yarn rw db seed
