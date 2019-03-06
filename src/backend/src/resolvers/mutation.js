const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { db } = require('../db')
const { sanitize } = require('../sanitize')

const Mutation = {
  async register (parent, args, ctx, info) {
    // Set email to lowercase to avoid duplication
    args.email = args.email.toLowerCase()

    // Hash password
    const password = await bcrypt.hash(args.password, 16)

    const user = await db.mutation.createUser(
      {
        data: { ...args, password, permissions: { set: ['USER'] } }
      },
      info
    )

    // Create the JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    // Store the cookie with the user for one (1) year
    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 3600 * 24 * 365
    })

    return user
  },

  async login (parent, args, ctx, info) {
    // Set email to lowercase to avoid duplication
    const email = args.email.toLowerCase()

    // Find user by email
    const user = await db.query.user({ where: { email } })

    if (!user) {
      throw Error(`No such user found for this email: ${email}`)
    }

    // Confirm the password
    const isValid = await bcrypt.compare(args.password, user.password)

    if (!isValid) {
      throw Error('Invalid password')
    }

    // Create token for user
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    // Store the cookie with the user for one (1) year
    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 3600 * 24 * 365
    })

    return user
  },

  logout (parent, args, ctx, info) {
    ctx.res.clearCookie('token')

    return 'Goodbye!'
  },

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
