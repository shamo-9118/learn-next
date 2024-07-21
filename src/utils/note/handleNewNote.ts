import supabase from '@/supabase/client';

export const handleChangeTitle = async (
  title: string,
  currentNoteId: number,
) => {
  if (!supabase) return;
  const { error } = await supabase
    .from('notion-demo-app')
    .update({ title })
    .eq('id', currentNoteId);

  if (error) {
    console.error('Error updating note', error);
  }
};
