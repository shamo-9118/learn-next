import supabase from '@/supabase/client';

export const fetchNotes = async () => {
  if (!supabase) return;
  const { data, error } = await supabase
    .from('notion-demo-app')
    .select('*')
    .order('id', { ascending: false });
  if (error) console.error('Error fetching notes', error);
  if (data) return data;
};
