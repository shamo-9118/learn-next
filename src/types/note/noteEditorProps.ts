export type NoteEditorProps = {
  content: string;
  isPreviewMode: boolean;
  onContentChange: (content: string) => Promise<void>;
};
