import supabase from '@/supabase/client';
import { fetchNotes } from '@/utils/note/fetchNotes';

export const handleContentChange = async (content: string, noteId: number) => {
  if (!supabase) return;
  const { error } = await supabase
    .from('notion-demo-app')
    .update({ content })
    .eq('id', noteId);
  if (error) console.error('Error updating note', error);

  fetchNotes();
};
