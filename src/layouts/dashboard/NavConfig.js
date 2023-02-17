// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'home',
    path: '/home',
    icon: getIcon('eva:keypad-fill'),
  },
  {
    title: 'checkout',
    path: '/cart',
    icon: getIcon('eva:shopping-cart-fill'),
  },
];

export default navConfig;
