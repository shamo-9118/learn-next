import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
  isPreviewMode: boolean;
}

const NoteEditor: React.FC<Props> = ({ content, isPreviewMode }) => {
  return isPreviewMode ? (
    <div className='markdown'>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  ) : (
    <textarea
      className='w-full h-[500px] p-2 border border-gray-300 rounded'
      value={content}
    />
  );
};

export default NoteEditor;
