import { UIContext } from '@/context/ui';
import { Entry } from '@/interfaces';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { DragEvent, FC, useContext } from 'react';

interface Props {
  entry: Entry;
  loading: boolean;
}
export const EntryCard: FC<Props> = ({ entry, loading }) => {
  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text', entry._id);
      startDragging();
    }
  };

  const onDragEnd = () => {
    // End of drag.
    endDragging();
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {loading && <LinearProgress />}
      <CardActionArea component={Link} href={`/entries/${entry._id}`}>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'end', paddingRight: '2' }}
        >
          <Typography variant="body2">hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
