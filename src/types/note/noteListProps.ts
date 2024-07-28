import type { Note } from '@/types/note/note';
export type NoteListProps = {
  notes: Note[];
  selectNoteId: number | null;
  onSelect: (note: Note) => void;
  handleChangeTitle: (title: string) => void;
  handleDeleteAction: (id: number) => Promise<void>;
};
