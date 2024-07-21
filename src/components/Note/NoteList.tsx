import { Note } from '@/types/note/note';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

type Props = {
  notes: Note[];
  selectNoteId: number | null;
  onSelect: (note: Note) => void;
  handleChangeTitle: (title: string) => void;
};

const NoteList: React.FC<Props> = ({
  notes,
  selectNoteId,
  onSelect,
  handleChangeTitle,
}) => {
  const [editingTitle, setEditingTitle] = useState('');
  const [selectEditTitleNoteId, setSelectEditTitleNoteId] = useState<
    number | null
  >(null);
  return (
    <ul className='space-y-2'>
      {notes.map((note) => (
        <li
          key={note.id}
          onClick={() => onSelect(note)}
          className={`cursor-pointer p-2 rounded flex justify-between ${
            selectNoteId === note.id ? 'bg-blue-200' : 'bg-white'
          }`}
        >
          {selectEditTitleNoteId === note.id ? (
            <input
              name='title'
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              className='ml-2 p-1 border border-gray-300 rounded w-[200px]'
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleChangeTitle(editingTitle);
                  setSelectEditTitleNoteId(null);
                }
              }}
            />
          ) : (
            <span>{note.title}</span>
          )}
          <button
            className='ml-2 text-blue-500'
            onClick={() => {
              setEditingTitle(note.title);
              setSelectEditTitleNoteId(note.id);
            }}
          >
            <FontAwesomeIcon icon={faCoffee} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
