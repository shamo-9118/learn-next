import { Note } from '@/types/note/note';

type Props = {
  notes: Note[];
};

const NoteList: React.FC<Props> = ({ notes }) => {
  return (
    <ul className='space-y-2'>
      {notes.map((note) => (
        <li
          key={note.id}
          className={`cursor-pointer p-2 rounded flex justify-between`}
        >
          <span>{note.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
