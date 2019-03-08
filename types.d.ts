interface UserModel {
  id: string
  name: string
  email: string
  permissions: Array<string>
  adventures: Array<AdventureModel>
}

interface AdventureModel {
  id: string
  title: string
  description: string
  owner: UserModel
  sessions: Array<SessionModel>
  quests: Array<QuestModel>
  [key: string]: any
}

interface QuestModel {
  id: string
  title: string
  description: string
  completed: boolean
  adventure?: AdventureModel
  [key: string]: any
}

interface SessionModel {
  id: string
  title: string
  description: string
  adventure?: AdventureModel
  [key: string]: any
}
