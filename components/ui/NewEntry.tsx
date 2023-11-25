'use client';

import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';
import AddIcon from '@mui/icons-material/Add';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);

  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

  const onTextChanges = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(event.target.value);
  };

  const onCancel = () => {
    setIsAddingEntry(false);
    setTouched(false);
  };

  const onSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    setTouched(false);
    setInputValue('');
  };

  const onBlurText = (event: React.FocusEvent<HTMLInputElement>) => {
    const checkCancel = (
      event.relatedTarget as HTMLElement
    )?.classList.contains('cancel-btn');
    if (!checkCancel) {
      setTouched(true);
    }
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: '8px' }}>
      {isAddingEntry ? (
        <form onSubmit={onSave}>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New entry"
            autoFocus
            error={inputValue.length <= 0 && touched}
            multiline
            value={inputValue}
            label="New entry"
            helperText={inputValue.length <= 0 && touched && 'Enter a value'}
            onChange={onTextChanges}
            onBlur={onBlurText}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button className="cancel-btn" onClick={onCancel} variant="text">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
            >
              Save
            </Button>
          </Box>
        </form>
      ) : (
        <Button
          startIcon={<AddIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Add Task
        </Button>
      )}
    </Box>
  );
};
