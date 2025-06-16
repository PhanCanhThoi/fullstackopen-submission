import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'

export interface Note {
  id: number
  content: string
  important: boolean
}

const getAll = (): Promise<Note[]> => {
  const request = axios.get<Note[]>(baseUrl)
  return request.then(res => res.data)
}

const create = (newNote: Omit<Note, 'id'>): Promise<Note> => {
  return axios.post<Note>(baseUrl, newNote).then(res => res.data)
}

const update = (id: number, updatedNote: Note): Promise<Note> => {
  return axios.put<Note>(`${baseUrl}/${id}`, updatedNote).then(res => res.data)
}

export default {
  getAll,
  create,
  update
}
