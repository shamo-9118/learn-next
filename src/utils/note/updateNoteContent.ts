import supabase from '@/supabase/client';

export const updateNoteContent = async (
  id: number,
  content: string,
): Promise<void> => {
  if (!supabase) {
    console.error('Supabase client is not initialized.');
    return;
  }

  const { error } = await supabase
    .from('notion-demo-app')
    .update({ content })
    .eq('id', id);

  if (error) {
    console.error('Error updating note content', error);
  }
};
