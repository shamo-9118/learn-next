import supabase from '@/supabase/client';
import type { Note } from '@/types/note/note';

export const fetchNotes = async (): Promise<Note[]> => {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('notion-demo-app')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching notes', error);
    return [];
  }

  return data || [];
};
