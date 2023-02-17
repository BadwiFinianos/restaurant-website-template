import { useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// @mui
import {
  Box,
  Button,
  useMediaQuery,
  Dialog,
  DialogActions,
  Typography,
  Slide,
  styled,
  useTheme,
  IconButton,
  AppBar,
  Toolbar,
  Stack,
  Divider,
} from '@mui/material';
// import { useTheme, styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NutritionFact from './NutritionFact';
import MealCard from './MealCard';
import Label from '../../../components/Label';
import CounterButton from '../../../components/CounterButton';
import { updateValueInArray } from '../../../utils/helpers';
import { addToCart } from '../../../state/actions';

const StyledProductImg = styled('img')({
  width: 220,
  height: 220,
  minWidth: 220,
  maxWidth: 220,
  objectFit: 'stretch',
  borderRadius: 10,
});

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 500,
  minWidth: 360,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

MealsList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default function MealsList({ items }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const [meal, setMeal] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddns, setSelectedAddons] = useState([]);

  const handleCloseMeal = () => {
    setMeal(null);
    setSelectedSize(null);
    setSelectedAddons([]);
    setFinalPrice(0);
  };

  const { name, imageURL, description, currency, price, isAvailable, nutritionFacts, isSizeRequired, sizes, addons } =
    meal ?? {};

  useEffect(() => {
    const selectedSize_ = sizes?.find((x) => x.isDefault) || isSizeRequired ? sizes?.[0] : null;
    setSelectedSize(selectedSize_);
    setSelectedAddons(meal?.addons || []);
  }, [isSizeRequired, sizes, meal]);

  useEffect(() => {
    if (selectedSize?.price && selectedSize?.price > 0) {
      setFinalPrice(selectedSize?.price);
    } else {
      setFinalPrice(price);
    }
  }, [selectedSize, sizes, meal, price]);

  const addMealToCart = () => {
    const filteredAddons = selectedAddns?.filter(({ quantity }) => quantity).sort((a, b) => a - b);
    const addedMeal = { ...meal, addon: filteredAddons, size: selectedSize };
    dispatch(addToCart(addedMeal));
    handleCloseMeal();
  };

  return (
    <Box style={{ width: '100%' }}>
      <Dialog
        fullScreen={fullScreen}
        open={!!meal}
        onClose={handleCloseMeal}
        TransitionComponent={Transition}
        aria-labelledby="responsive-dialog-title"
        minWidth={360}
      >
        <AppBar sx={{ position: 'relative', alignItems: 'flex-end' }}>
          <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <AddShoppingCartIcon />
            <IconButton edge="end" color="inherit" onClick={handleCloseMeal} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <ContentStyle
          style={{
            textAlign: 'center',
            alignItems: 'center',
            minWidth: 360,
            justifyContent: 'flex-start',
            padding: 20,
          }}
        >
          <StyledProductImg alt={name?.en} src={imageURL} />
          <Typography
            variant="h3"
            style={{ width: '100%', padding: 0, marginTop: 20, color: theme.palette.grey['600'] }}
          >
            {name?.en}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ width: '100%', padding: 0, margin: 0, color: theme.palette.grey['500'] }}
          >
            {description?.en}
          </Typography>
          <Stack flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'}>
            {nutritionFacts
              ?.filter((x) => x.id === 'calories')
              .map((fact) => (fact.value ? <NutritionFact key={fact.id} fact={fact} /> : null))}
          </Stack>
          <Divider variant="middle" width={'90%'} />
          {isSizeRequired && (
            <Stack flexDirection={'row'} flexWrap={'wrap'} justifyContent={'space-between'}>
              {sizes.map((size) => (
                <Button
                  key={size.id}
                  size="large"
                  onClick={() => {
                    setSelectedSize(size);
                  }}
                  style={{ padding: 0, margin: 6 }}
                >
                  <Label
                    variant="filled"
                    color={selectedSize?.id === size.id ? 'secondary' : undefined}
                    sx={{ paddingTop: 2, paddingBottom: 2, borderRadius: 1 }}
                  >
                    <Typography variant="h6" style={{ width: '100%', padding: 4, color: theme.palette.grey['600'] }}>
                      {`${currency} ${size.price?.toFixed(2)}`}
                    </Typography>
                    <Typography variant="h6" style={{ width: '100%', padding: 4, color: theme.palette.grey['600'] }}>
                      {size.name?.en}
                    </Typography>
                  </Label>
                </Button>
              ))}
            </Stack>
          )}
          <Divider variant="middle" width={'90%'} />
          <Stack direction={'column'} width={'90%'}>
            {addons?.map(({ id, name, quantity }) => (
              <Stack key={id} direction="row" justifyContent="space-between">
                <Typography
                  variant="subtitle1"
                  textAlign={'start'}
                  style={{ width: '100%', padding: 4, color: theme.palette.grey['600'] }}
                >
                  {name?.en}
                </Typography>
                <CounterButton
                  quantity={quantity}
                  setQuantity={(val) => {
                    setSelectedAddons(updateValueInArray(selectedAddns, id, 'quantity', val));
                  }}
                />
              </Stack>
            ))}
          </Stack>
          <Divider variant="middle" width={'90%'} />
        </ContentStyle>

        <DialogActions>
          <Typography variant="h4" style={{ width: '50%', padding: 4, color: theme.palette.primary.dark }}>
            {`${currency} ${finalPrice?.toFixed(2)}`}
          </Typography>
          <Button autoFocus onClick={handleCloseMeal} variant="text">
            <Typography variant="subtitle1" style={{ padding: 4, color: theme.palette.grey['500'] }}>
              Cancel
            </Typography>
          </Button>
          {isAvailable ? (
            <Button variant="contained" onClick={addMealToCart} autoFocus color="secondary">
              <Typography variant="subtitle1" style={{ padding: 4, color: theme.palette.grey['800'] }}>
                Add
              </Typography>
            </Button>
          ) : (
            <Label
              variant="ghost"
              color={'error'}
              sx={{
                textTransform: 'uppercase',
              }}
            >
              Not Available
            </Label>
          )}
        </DialogActions>
      </Dialog>
      {items?.map((item) => {
        const { _id } = item;
        return <MealCard key={_id} meal={item} onAddPress={(id) => setMeal(items.find((itm) => itm.id === id))} />;
      })}
    </Box>
  );
}
