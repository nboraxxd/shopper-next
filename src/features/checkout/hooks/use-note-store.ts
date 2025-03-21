import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type NoteStore = {
  note: string | null
  setNote: (note: string | null) => void
}

const useNoteStore = create<NoteStore>()(
  devtools(
    (set) => ({
      note: null,
      setNote: (note) => set({ note }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'noteStore',
    }
  )
)

export default useNoteStore
