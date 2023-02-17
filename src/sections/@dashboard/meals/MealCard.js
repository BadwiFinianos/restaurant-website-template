import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack, Button } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// components
// import Iconify from '../../../components/Iconify';
import Label from '../../../components/Label';
import NutritionFact from './NutritionFact';
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  width: 160,
  height: 160,
  minWidth: 160,
  maxWidth: 160,
  // aspectRatio: '1/1',
  //   objectFit: 'stretch',
});

// ----------------------------------------------------------------------

MealCard.propTypes = {
  meal: PropTypes.object.isRequired,
  onAddPress: PropTypes.func.isRequired,
};

export default function MealCard({ meal, onAddPress }) {
  const theme = useTheme();

  const { id, name, imageURL, description, nutritionFacts, currency, price, isAvailable } = meal;
  return (
    <Card style={{ minWidth: '100%', marginTop: 16, display: 'flex', flexDirection: 'row', height: 160 }}>
      <Box>
        <StyledProductImg alt={name?.en} src={imageURL} />
      </Box>
      <Stack
        direction={'column'}
        style={{ width: '100%', maxWidth: 360, justifyContent: 'space-between', position: 'relative' }}
      >
        <Stack
          spacing={2}
          sx={{ p: 3 }}
          direction={'column'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            textAlign: 'start',
            padding: 8,
          }}
        >
          <div style={{ position: 'absolute', right: 4, top: 4 }}>
            {isAvailable ? (
              <Button size="small" onClick={() => onAddPress(id)}>
                <Label variant="filled" color="secondary">
                  <AddShoppingCartIcon style={{ width: 16, color: theme.palette.grey['600'] }} />{' '}
                  <Typography
                    variant="subtitle2"
                    style={{ width: '100%', padding: 0, color: theme.palette.grey['600'] }}
                  >
                    Add
                  </Typography>
                </Label>
              </Button>
            ) : (
              <Label variant="filled" color={'error'}>
                Not Available
              </Label>
            )}
          </div>

          <Typography
            variant="h5"
            style={{ width: '100%', padding: 0, marginTop: 20, color: theme.palette.grey['600'] }}
          >
            {name?.en}
          </Typography>
          <Typography variant="caption" style={{ width: '100%', padding: 0, margin: 0 }}>
            {description?.en}
          </Typography>

          {nutritionFacts
            .filter((x) => x.id === 'calories')
            .map((fact) => (fact.value ? <NutritionFact key={fact.id} fact={fact} /> : null))}
        </Stack>

        <Stack
          spacing={2}
          direction={'column'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            textAlign: 'end',
            padding: 8,
            minWidth: 90,
          }}
        >
          <Typography variant="h5" style={{ width: '100%', padding: 0, color: theme.palette.primary.dark }}>
            {`${currency} ${price.toFixed(2)}`}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
