import TButton from './demo';
(TButton as any).install = (Vue: any) => {
  Vue.component(TButton.NAME, TButton);
};

const components = [
  TButton,
];

const install = (Vue: any) => {
  components.map((component: any) => {
    Vue.use(component);
  });
};

export {
  TButton,
};

export default {
  install,
};

