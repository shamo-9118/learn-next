import { useState } from 'react';
import NoteList from '@/components/Note/NoteList';
import NoteEditor from '@/components/Note/NoteEditor';
import { useNotes } from '@/hooks/note/useNotes';

import type { Note } from '@/types/note/note';

const Note = () => {
  const [previewMode, setPreviewMode] = useState(false);

  const {
    notes,
    currentNoteId,
    setCurrentNoteId,
    handleNewNote,
    handleContentChange,
    handleChangeTitle,
  } = useNotes();

  return (
    <div className='flex h-screen'>
      <div className='w-[300px] bg-gray-100 p-4'>
        <div className='mb-4'>
          <button
            className='w-full p-2 bg-blue-500 text-white font-bold rounded'
            onClick={handleNewNote}
          >
            新規作成
          </button>
        </div>
        <NoteList
          notes={notes}
          selectNoteId={currentNoteId}
          onSelect={(note) => setCurrentNoteId(note.id)}
          handleChangeTitle={handleChangeTitle}
        />
      </div>
      <div className='flex-1 p-4'>
        <div className='mb-4 flex justify-between'>
          <h2 className='text-xl font-bold'>Note Editor</h2>
          <button
            className='p-2 bg-green-500 text-white font-bold rounded'
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </button>{' '}
        </div>
        <NoteEditor
          content={
            notes.find((note) => note.id === currentNoteId)?.content || ''
          } // 選択したノートを表示
          isPreviewMode={previewMode}
          onContentChange={handleContentChange}
        />
      </div>
    </div>
  );
};

export default Note;
