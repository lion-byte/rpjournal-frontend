const { db } = require('../db')
const { sanitize } = require('../sanitize')

const Mutation = {
  async createAdventure (parent, args, ctx, info) {
    const { title, description } = args

    const cleanDescription = sanitize(description)

    return db.mutation.createAdventure(
      { data: { title, description: cleanDescription } },
      info
    )
  },

  async updateAdventure (parent, args, ctx, info) {
    const { id, ...updates } = args

    if (updates.description) {
      updates.description = sanitize(updates.description)
    }

    return db.mutation.updateAdventure(
      {
        data: updates,
        where: { id }
      },
      info
    )
  },

  async deleteAdventure (parent, args, ctx, info) {
    const { id } = args

    return db.mutation.deleteAdventure({ where: { id } }, info)
  },

  async createSession (parent, args, ctx, info) {
    const { adventureId, title, description } = args

    const adventure = await db.query.adventure({ where: { id: adventureId } })

    if (!adventure) {
      throw Error(`No such Adventure for ${adventureId}`)
    }

    const cleanDescription = sanitize(description)

    return db.mutation.createSession(
      {
        data: {
          title,
          description: cleanDescription,
          adventure: { connect: { id: adventureId } }
        }
      },
      info
    )
  },

  async updateSession (parent, args, ctx, info) {
    const { id, ...updates } = args

    if (updates.description) {
      updates.description = sanitize(updates.description)
    }

    return db.mutation.updateSession({ data: updates, where: { id } }, info)
  },

  async deleteSession (parent, args, ctx, info) {
    const { id } = args

    return db.mutation.deleteSession({ where: { id } }, info)
  },

  async createQuest (parent, args, ctx, info) {
    const { adventureId, title, description, completed = false } = args

    const adventure = await db.query.adventure({ where: { id: adventureId } })

    if (!adventure) {
      throw Error(`No such Adventure for ${adventureId}`)
    }

    const cleanDescription = sanitize(description)

    return db.mutation.createQuest(
      {
        data: {
          title,
          description: cleanDescription,
          completed,
          adventure: { connect: { id: adventureId } }
        }
      },
      info
    )
  },

  async updateQuest (parent, args, ctx, info) {
    const { id, ...updates } = args

    if (updates.description) {
      updates.description = sanitize(updates.description)
    }

    return db.mutation.updateQuest({ data: updates, where: { id } }, info)
  },

  async deleteQuest (parent, args, ctx, info) {
    const { id } = args

    return db.mutation.deleteQuest({ where: { id } }, info)
  }
}

module.exports = { Mutation }
