import { useEffect, useState } from 'react';
import supabase from '@/supabase/client';
import NoteList from '@/components/Note/NoteList';
import type { Note } from '@/types/note/note';
import NoteEditor from '@/components/Note/NoteEditor';

const Note = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetchNotes();

    if (!supabase) return;
    const mySubscription = supabase
      .channel('note')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'note' },
        fetchNotes,
      )
      .subscribe();

    return () => {
      supabase && supabase.removeChannel(mySubscription);
    };
  }, []);

  const fetchNotes = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('notion-demo-app')
      .select('*')
      .order('id', { ascending: false });
    if (!data) return;
    setNotes(data);
    if (error) console.error('Error fetching notes', error);
  };

  const handleNewNote = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('notion-demo-app')
      .insert({ title: '新規ノート', content: '' });
    if (error || data) {
      console.error(error);
      return;
    }

    fetchNotes();
  };

  const handleContentChange = async (content: string) => {
    if (!supabase) return;
    const { error } = await supabase
      .from('notion-demo-app')
      .update({ content })
      .eq('id', notes[0].id);
    if (error) console.error('Error updating note', error);

    fetchNotes();
  };

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
        <NoteList notes={notes} />
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
          content={notes[0]?.content}
          isPreviewMode={previewMode}
          onContentChange={handleContentChange}
        />
      </div>
    </div>
  );
};

export default Note;
