import supabase from '@/supabase/client';

export const createNote = async (): Promise<void> => {
  if (!supabase) {
    console.error('Supabase client is not initialized.');
    return;
  }

  const { error } = await supabase
    .from('notion-demo-app')
    .insert({ title: '新規ノート', content: '' });

  if (error) {
    console.error('Error creating new note', error);
  }
};
