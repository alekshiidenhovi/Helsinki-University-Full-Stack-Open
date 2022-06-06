import { HealthCheckEntry, HealthCheckRating } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckData = ({ entry }: { entry: HealthCheckEntry }) => {
  const heartColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.CriticalRisk:
        return "red";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.Healthy:
        return "green";
    }
  };
  
  return (
    <>
      <p>
        {entry.date}
        <FavoriteIcon sx={ {
        color: heartColor(entry.healthCheckRating),
        stroke: "black",
        strokeWidth: 2
      } } />
      </p>
      <p><i>{entry.description}</i></p>
      
      <p>Diagnosed by {entry.specialist}</p>
    </>
  );
};

export default HealthCheckData;