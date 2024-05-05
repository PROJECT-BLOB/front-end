/* eslint-disable storybook/prefer-pascal-case */
import Tab from '../components/Tab';

export default { title: 'Tab', component: Tab };

export const focused = { args: { children: 'focused-tab', focused: true } };

export const unfocused = { args: { children: 'unfocused-tab', focused: false } };
