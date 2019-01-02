import { default as Button } from './button';
import { default as Alert } from './alert';

const components = [
  Button,
  Alert,
];

const install = (Vue: any) => {
  components.map((component: any) => {
    Vue.use(component);
  });
};

if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}

export {
  Button,
  Alert,
};

export default {
  install,
};
