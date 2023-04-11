// .storybook/manager.js

import { addons } from '@storybook/addons';
import sortTheme from './SortTheme';

addons.setConfig({
  theme: sortTheme,
});