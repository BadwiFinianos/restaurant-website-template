import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

CategoryCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

export default function CategoryCard({ id, name, imageURL, isSelected, onPress }) {
  const theme = useTheme();

  return (
    <Card
      style={{
        minWidth: isSelected ? 160 : 140,
        margin: 10,
        marginTop: isSelected ? 0 : 16,
        backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.primary.contrastText,
      }}
      onClick={() => {
        onPress(id);
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={name} src={imageURL} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }} direction={'row'}>
        <Typography
          variant="subtitle2"
          noWrap
          style={{ width: '100%', color: isSelected ? theme.palette.secondary.main : theme.palette.primary.main }}
        >
          {name}
        </Typography>
      </Stack>
    </Card>
  );
}
