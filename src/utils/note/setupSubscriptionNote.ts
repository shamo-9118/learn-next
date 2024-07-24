import type { SupabaseClient } from '@supabase/supabase-js';

export const setupSubscriptionNote = (
  supabase: SupabaseClient,
  fetchNotesCallback: () => void,
) => {
  const subscription = supabase
    .channel('notion-demo-app')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'notion-demo-app' },
      fetchNotesCallback,
    )
    .subscribe();

  return subscription;
};
