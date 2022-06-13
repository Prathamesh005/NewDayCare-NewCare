import { memo, useCallback, useState } from 'react';
import React from 'react';
import { GrayTextInput } from '../../../components';
import TreatmentContext from '../MyStateContext';

export function NoteInput({ disabled }) {
  const user = React.useContext(TreatmentContext);

  const onChangeNote = useCallback(e => {
    user.setNote(e.target.value);
  }, []);

  return (
    <GrayTextInput
      id="note-additional"
      name="note-additional"
      placeholder="Enter Value Here"
      rows={4}
      maxRows={4}
      multiline
      disabled={disabled}
      value={user.note}
      onChange={onChangeNote}
    />
  );
}

export const MemoizedNoteInput = React.memo(NoteInput);
