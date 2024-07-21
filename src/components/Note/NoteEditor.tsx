import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { NoteEditorProps } from '@/types/note/noteEditorProps';

const NoteEditor: React.FC<NoteEditorProps> = ({
  content,
  isPreviewMode,
  onContentChange,
}) => {
  return isPreviewMode ? (
    <div className='markdown'>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  ) : (
    <textarea
      className='w-full h-[500px] p-2 border border-gray-300 rounded'
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
    />
  );
};

export default NoteEditor;
