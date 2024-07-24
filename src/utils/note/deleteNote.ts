import supabase from '@/supabase/client';

export const deleteNote = async (noteId: number) => {
  if (!supabase) {
    console.error('Supabase clieant is not initialized');
    return;
  }

  const { error } = await supabase
    .from('notion-app-demo')
    .delete()
    .eq('id', noteId);

  if (error) {
    console.error('Error deleting Note', error);
  }
};
