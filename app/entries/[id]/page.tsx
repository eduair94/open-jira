'use client';
import { EntryStatus } from '@/interfaces';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import {
  Button,
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
import { useMemo, useState } from 'react';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  params: { id: string; entry: string };
}

const EntryPage: NextPage<Props> = ({ params }) => {
  const { entry: entryString } = params;
  const entry = JSON.parse(entryString);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

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

  const minutes = 30;
  return (
    <div>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <form action="">
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
                  helperText={isNotValid && 'Please enter a value'}
                  error={isNotValid}
                  label="New Entry"
                  value={inputValue}
                  onChange={onInputValueChange}
                  onBlur={() => setTouched(true)}
                ></TextField>
                <FormControl>
                  <FormLabel>Status:</FormLabel>
                  <RadioGroup value={status} onChange={onStatusChanged} row>
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
                <Button
                  disabled={!inputValue}
                  startIcon={<SaveOutlinedIcon />}
                  variant="contained"
                  fullWidth
                >
                  Save
                </Button>
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
