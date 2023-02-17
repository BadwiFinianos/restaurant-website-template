import PropTypes from 'prop-types';
// @mui
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CaloriesIcon from '../../../assets/icons/calories.svg';
import ProteinIcon from '../../../assets/icons/protein.svg';
import FatIcon from '../../../assets/icons/fat.svg';
import CarbsIcon from '../../../assets/icons/carbs.svg';
import SaturatedFatIcon from '../../../assets/icons/saturatedFat.svg';
// ----------------------------------------------------------------------

NutritionFact.propTypes = {
  fact: PropTypes.object.isRequired,
};

export default function NutritionFact({ fact }) {
  const theme = useTheme();
  const { id, name, value } = fact;
  let Icon = null;
  switch (id) {
    case 'calories':
      Icon = CaloriesIcon;
      break;
    case 'carbs':
      Icon = CarbsIcon;
      break;
    case 'protein':
      Icon = ProteinIcon;
      break;
    case 'fat':
      Icon = FatIcon;
      break;
    case 'saturatedFat':
      Icon = SaturatedFatIcon;
      break;
    default:
      break;
  }
  return (
    <Typography
      variant="caption"
      style={{
        padding: 0,
        margin: 6,
        display: 'flex',
        flexDirection: 'row',
        color: theme.palette.grey['600'],
      }}
    >
      <img src={Icon} alt="" style={{ width: 16, height: 16, marginRight: 6 }} />
      {`${value} ${name?.en}`}
    </Typography>
  );
}
