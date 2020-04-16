import { db } from 'src/lib/db'

export const stories = () => {
  return db.story.findMany()
}

export const story = ({ id }) => {
  return db.story.findOne({
    where: { id },
  })
}

export const createStory = ({ input }) => {
  return db.story.create({
    data: input,
  })
}

export const updateStory = ({ id, input }) => {
  return db.story.update({
    data: input,
    where: { id },
  })
}

export const deleteStory = ({ id }) => {
  return db.story.delete({
    where: { id },
  })
}
