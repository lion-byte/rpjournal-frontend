interface AdventureModel {
  id: string
  title: string
  description: string
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
