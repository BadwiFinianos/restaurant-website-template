import { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container, Box, LinearProgress } from '@mui/material';
// import Carousel from 'react-material-ui-carousel'
// components
import useMenu from '../hooks/useMenu';
import useSettings from '../hooks/useSettings';
import Page from '../components/Page';

import CategoriesCarousel from '../sections/@dashboard/categories/CategoriesCarousel';
import { MealsList } from '../sections/@dashboard/meals';
// ----------------------------------------------------------------------

const StyledImg = styled('img')({
  width: '100%',
  //  aspectRatio: '1/1',
  objectFit: 'stretch',
});

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
// ----------------------------------------------------------------------

export default function Home() {
  const { settings } = useSettings();
  const { mainImageURL } = settings || {};
  const [selectedCtegoryID, setSelectedCategoryID] = useState(null);
  const { isLoadingCategories, categories, meals, category, isError } = useMenu({ selectedCtegoryID });

  return (
    <Page title="Home">
      <Container>
        {mainImageURL && <StyledImg src={mainImageURL} />}
        {isLoadingCategories && (
          <Box sx={{ width: '100%', marginTop: 4 }}>
            <LinearProgress />
          </Box>
        )}
        {isError && (
          <Typography gutterBottom align="center" variant="h3">
            An Error occured! Please refresh the page
          </Typography>
        )}
        <ContentStyle
          style={{ textAlign: 'center', alignItems: 'center', minWidth: '100%', justifyContent: 'flex-start' }}
        >
          <CategoriesCarousel items={categories} returnSelectedCategory={setSelectedCategoryID} />
          {meals?.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                alignItems: 'center',
                minWidth: '100%',
                justifyContent: 'center',
                height: '40vh',
                marginTop: '10vh',
              }}
            >
              <Typography gutterBottom align="center" variant="h3">
                {`No Meals available in ${category?.name?.en}`}
              </Typography>
              <Box
                component="img"
                src="/static/images/lineupfit.png"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </div>
          ) : (
            <MealsList items={meals} />
          )}
        </ContentStyle>
      </Container>
    </Page>
  );
}
