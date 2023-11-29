'use client';
import { DeleteEntry, Loading } from '@/components/ui';
import { EntriesContext } from '@/context/entries';
import { updateEntryActionPage } from '@/context/entries/entryActions';
import { entryServerById } from '@/context/entries/entryServer';
import { Entry, EntryStatus } from '@/interfaces';
import { dateFunctions } from '@/utils';
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
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from '@mui/material';
import { NextPage } from 'next';
import {
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

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

interface PropsContent {
  entry: Entry;
}

const EntryPageContent: FC<PropsContent> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const { updateEntryPage } = useContext(EntriesContext);
  const [touched, setTouched] = useState(false);

  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    document.title = event.target.value;
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const isNotValid = useMemo(
    () => touched && !inputValue,
    [touched, inputValue],
  );

  const [formState, formAction] = useFormState(updateEntryActionPage, null);

  useEffect(() => {
    if (formState) updateEntryPage();
  }, [formState]);

  return (
    <div>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <form action={formAction}>
              <input type="hidden" value={entry?._id} name="_id" />
              <CardHeader
                title="Entry:"
                subheader={`Created ${
                  entry?.createdAt &&
                  dateFunctions.getFormatDistanceToNow(entry.createdAt)
                }`}
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
      {entry && <DeleteEntry entry={entry} />}
    </div>
  );
};

interface Props {
  params: {
    id: string;
  };
}

const EntryPage: NextPage<Props> = ({ params }) => {
  const [, startTransition] = useTransition();
  const [entry, setEntry] = useState<Entry | null>(null);
  useEffect(() => {
    startTransition(async () => {
      const entry = JSON.parse(await entryServerById(params.id)) as Entry;
      setEntry(entry);
    });
  }, []);

  return <>{!entry ? <Loading /> : <EntryPageContent entry={entry} />}</>;
};
export default EntryPage;
