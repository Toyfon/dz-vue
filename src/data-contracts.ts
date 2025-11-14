export type State = 'closed' | 'opened'
export type Status = 'success' | 'fail' | 'pending'

export interface Card {
    word: string
    translation: string
    state: State
    status: Status
}
