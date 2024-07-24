import { useState, useEffect, useCallback } from 'react';
import supabase from '@/supabase/client';
import {
  fetchNotes,
  createNote,
  updateNoteContent,
  updateNoteTitle,
  setupSubscriptionNote,
} from '@/utils/note';
import type { Note } from '@/types/note/note';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);

  const fetchNotesCallback = useCallback(async () => {
    const notesData = await fetchNotes();
    setNotes(notesData);
  }, []);

  const handleNewNote = async () => {
    await createNote();
    fetchNotesCallback();
  };

  const handleContentChange = async (content: string) => {
    if (!currentNoteId) return;
    await updateNoteContent(currentNoteId, content);
    fetchNotesCallback();
  };

  const handleChangeTitle = async (title: string) => {
    if (!currentNoteId) return;
    await updateNoteTitle(currentNoteId, title);
  };

  useEffect(() => {
    fetchNotesCallback();

    if (!supabase) return;

    const connectedChanel = setupSubscriptionNote(supabase, fetchNotesCallback);

    return () => {
      supabase && supabase.removeChannel(connectedChanel);
    };
  }, [fetchNotesCallback]);

  return {
    notes,
    setNotes,
    currentNoteId,
    setCurrentNoteId,
    handleNewNote,
    handleContentChange,
    handleChangeTitle,
  };
};
