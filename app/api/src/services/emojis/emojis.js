import { db } from 'src/lib/db'

export const emojis = () => {
  return db.emoji.findMany()
}

export const emoji = ({ id }) => {
  return db.emoji.findOne({
    where: { id },
  })
}

export const createEmoji = ({ input }) => {
  return db.emoji.create({
    data: input,
  })
}

export const updateEmoji = ({ id, input }) => {
  return db.emoji.update({
    data: input,
    where: { id },
  })
}

export const deleteEmoji = ({ id }) => {
  return db.emoji.delete({
    where: { id },
  })
}
