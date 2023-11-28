'use client';
import { EntriesContext } from '@/context/entries';
import { updateEntryActionPage } from '@/context/entries/entryActions';
import { Entry, EntryStatus } from '@/interfaces';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LoadingButton from '@mui/lab/LoadingButton';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from '@mui/material';
import { NextPage } from 'next';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  params: { id: string; entry: string };
}

const SubmitBtn: FC<{ inputValue: string }> = ({ inputValue }) => {
  const { pending } = useFormStatus();
  return (
    <LoadingButton
      type="submit"
      disabled={!inputValue}
      loading={pending}
      loadingIndicator="Loading…"
      startIcon={<SaveOutlinedIcon />}
      variant="contained"
      fullWidth
    >
      Save
    </LoadingButton>
  );
};

const EntryPage: NextPage<Props> = ({ params }) => {
  const { entry: entryString } = params;
  const entry = JSON.parse(entryString);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const { updateEntry } = useContext(EntriesContext);

  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const isNotValid = useMemo(
    () => touched && !inputValue,
    [touched, inputValue],
  );

  const [formActionState, formAction] = useFormState(
    updateEntryActionPage,
    null,
  );

  useEffect(() => {
    if (!formActionState) return;
    updateEntry(JSON.parse(formActionState) as Entry, true);
  }, [formActionState]);

  const minutes = 30;
  return (
    <div>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <form action={formAction}>
              <input type="hidden" value={entry._id} name="_id" />
              <CardHeader
                title="Entry:"
                subheader={`Created ${minutes} minutes ago`}
              ></CardHeader>
              <CardContent>
                <TextField
                  sx={{ marginTop: 0, marginBottom: 2 }}
                  fullWidth
                  placeholder="New entry"
                  autoFocus
                  multiline
                  required
                  name="description"
                  helperText={isNotValid && 'Please enter a value'}
                  error={isNotValid}
                  label="New Entry"
                  value={inputValue}
                  onChange={onInputValueChange}
                  onBlur={() => setTouched(true)}
                ></TextField>
                <FormControl>
                  <FormLabel>Status:</FormLabel>
                  <RadioGroup
                    name="status"
                    value={status}
                    onChange={onStatusChanged}
                    row
                  >
                    {validStatus.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardActions>
                <SubmitBtn inputValue={inputValue} />
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        type="submit"
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          color: 'white',
          '&:hover': {
            backgroundColor: 'error.dark',
          },
          backgroundColor: 'error.main',
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default EntryPage;
