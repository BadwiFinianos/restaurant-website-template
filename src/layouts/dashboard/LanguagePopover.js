import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { updateLanguage } from '../../state/actions';
// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg',
  },
  {
    value: 'ar',
    label: 'Arabic',
    icon: '/static/icons/ic_flag_ar.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state);
  console.log('LANGUAGE', language);
  const selectedLanguage = LANGS.find(({ value }) => value === language) || LANGS[0];

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={selectedLanguage.icon} alt={selectedLanguage.label} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map(({ value, label, icon }) => (
            <MenuItem
              key={value}
              selected={value === selectedLanguage.value}
              onClick={() => {
                dispatch(updateLanguage(value));
                setOpen(false);
              }}
            >
              <Box component="img" alt={label} src={icon} sx={{ width: 28, mr: 2 }} />
              {label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
