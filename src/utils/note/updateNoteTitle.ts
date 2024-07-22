import supabase from '@/supabase/client';

export const updateNoteTitle = async (
  id: number,
  title: string,
): Promise<void> => {
  if (!supabase) {
    console.error('Supabase client is not initialized.');
    return;
  }

  const { error } = await supabase
    .from('notion-demo-app')
    .update({ title })
    .eq('id', id);

  if (error) {
    console.error('Error updating note title', error);
  }
};
