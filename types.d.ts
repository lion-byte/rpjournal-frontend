interface SessionModel {
  id: string
  date: string
  notes: string
}

interface QuestModel {
  id: string
  title: string
  details: string
  completed: boolean
}

interface JournalModel {
  id: string
  title: string
  description: string
  sessions: Array<SessionModel>
  quests: Array<QuestModel>
}
