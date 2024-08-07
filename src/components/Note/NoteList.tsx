import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import type { NoteListProps } from '@/types/note/noteListProps';

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectNoteId,
  onSelect,
  handleChangeTitle,
  handleDeleteAction,
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
              className='ml-2 p-1 border border-gray-300 rounded w-[200px]'
              onChange={(e) => {
                setEditingTitle(e.target.value);
                handleChangeTitle(e.target.value);
              }}
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
          <div className='flex gap-2'>
            <button
              className='ml-2 text-blue-500'
              onClick={() => {
                setEditingTitle(note.title);
                setSelectEditTitleNoteId((preveSelectedEditTitleNoteId) => {
                  if (preveSelectedEditTitleNoteId === note.id) {
                    return null;
                  }

                  return note.id;
                });
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              className='ml-2 text-blue-500'
              onClick={() => handleDeleteAction(note.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
