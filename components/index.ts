import { default as TButton  } from './t-button';

const components = [
  TButton,
];

const install = (Vue: any) => {
  components.map((component: any) => {
    Vue.use(component);
  });
};

if (typeof (window as any) !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}

export {
  TButton,
};

export default {
  install,
};

