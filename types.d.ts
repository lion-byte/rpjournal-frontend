interface SessionModel {
  id: string
  notes: Array<string>
}

interface JournalModel {
  id: string
  title: string
  description: string
  sessions: Array<SessionModel>
}
