import supabase from '@/supabase/client';
import { fetchNotes } from '@/utils/note/fetchNotes';

export const handleNewNote = async () => {
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
