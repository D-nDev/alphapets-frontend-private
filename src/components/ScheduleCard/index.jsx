import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ScheduleCard(props) {
  const classes = useStyles();

  return props.schedules.map((schedule, i) => (
    <Card key={i}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Consulta de {schedule.pet_name}
        </Typography>
        <Typography variant="h5" component="h2" style={{ marginBottom: '2vh' }}>
          {schedule.description}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Data: {format(new Date(schedule.date), 'dd/MM/yyyy')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            props.click(schedule.id);
          }}
          style={{ color: 'red' }}
          size="small"
        >
          Desagendar consulta
        </Button>
      </CardActions>
    </Card>
  ));
}

export default ScheduleCard;
