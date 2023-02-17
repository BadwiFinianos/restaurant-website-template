import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function CartPopover() {
  const { cart } = useSelector((state) => state);
  const cartLength = cart?.length;

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0.5,

          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
          width: 40,
          height: 40,
        }}
      >
        {cartLength ? (
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: 'red',
              position: 'absolute',
              top: -3,
              right: -3,
            }}
          >
            <Typography variant="subtitle2" color={'#fff'}>
              {cartLength}
            </Typography>
          </div>
        ) : null}
        <Iconify icon={'eva:shopping-cart-fill'} sx={{ width: 32, height: 32, ml: 0 }} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {cart?.map(({ name, id, imageURL, quantity }) => (
            <Stack key={id} direction={'row'}>
              <Avatar alt="" src={imageURL} />
              <Stack directon={'column'} marginLeft={2}>
                <Typography variant="subtitle2" noWrap>
                  {name?.en}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {quantity}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ m: 1 }}>Checkout</MenuItem>
      </MenuPopover>
    </div>
  );
}
