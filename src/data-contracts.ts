export type State = 'closed' | 'opened'
export type Status = 'success' | 'fail' | 'pending'

export interface CardWithStatuses {
    word: string
    translation: string
    state: State
    status: Status
}


export interface Card extends Pick<CardWithStatuses, 'word'| 'translation' >{}

