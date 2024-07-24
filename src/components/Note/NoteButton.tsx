import React, { ReactNode, Dispatch, SetStateAction } from 'react';

type ButtonProps = {
  color: string;
  hundleClick: Dispatch<SetStateAction<boolean>>;
  mode?: boolean;
  children: ReactNode;
};

export const NoteButton = (props: ButtonProps) => {
  return (
    <button
      className={`p-2 ${props.color} text-white font-bold rounded`}
      onClick={() => props.hundleClick(props.mode ?? !props.mode)}
    >
      {props.children}
    </button>
  );
};
