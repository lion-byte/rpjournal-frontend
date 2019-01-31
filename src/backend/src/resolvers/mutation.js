const { db } = require('../db')

const Mutation = {
  async createAdventure (parent, args, ctx, info) {
    const { title, description } = args

    return db.mutation.createAdventure({ data: { title, description } }, info)
  },

  async createSession (parent, args, ctx, info) {
    const { id, title, description } = args

    const adventure = await db.query.adventure({ where: { id } })

    if (!adventure) {
      throw Error(`No such Adventure for ${id}`)
    }

    return db.mutation.createSession(
      {
        data: { title, description, adventure: { connect: { id } } }
      },
      info
    )
  },

  async createQuest (parent, args, ctx, info) {
    const { id, title, description, completed = false } = args

    const adventure = await db.query.adventure({ where: { id } })

    if (!adventure) {
      throw Error(`No such Adventure for ${id}`)
    }

    return db.mutation.createQuest(
      {
        data: { title, description, completed, adventure: { connect: { id } } }
      },
      info
    )
  }
}

module.exports = { Mutation }
