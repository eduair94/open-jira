'use client';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';
import { Entry } from '@/interfaces';
import AddIcon from '@mui/icons-material/Add';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Box, Button, Collapse, TextField } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addEntryAction } from './entryActions';

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);
  const { pending } = useFormStatus();
  const [formActionState, formAction] = useFormState(addEntryAction, null);

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

  const onBlurText = (event: React.FocusEvent<HTMLInputElement>) => {
    const checkCancel = (
      event.relatedTarget as HTMLElement
    )?.classList.contains('cancel-btn');
    if (!checkCancel) {
      setTouched(true);
    }
  };

  useEffect(() => {
    if (formActionState) {
      addNewEntry(JSON.parse(formActionState) as Entry);
      setTouched(false);
      setInputValue('');
    }
  }, [formActionState]);

  return (
    <Box sx={{ marginBottom: 2, paddingX: '8px' }}>
      <Collapse in={isAddingEntry}>
        <form action={formAction}>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="New entry"
            autoFocus
            error={inputValue.length <= 0 && touched}
            multiline
            required
            value={inputValue}
            label="New entry"
            name="description"
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
              disabled={pending}
              type="submit"
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
            >
              Save
            </Button>
          </Box>
        </form>
      </Collapse>

      <Collapse in={!isAddingEntry} sx={{ marginTop: 2 }}>
        <Button
          startIcon={<AddIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Add Task
        </Button>
      </Collapse>
    </Box>
  );
};
