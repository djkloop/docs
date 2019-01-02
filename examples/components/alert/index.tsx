import Alert from './alert';

(Alert as any).install = (Vue: any) => {
  Vue.component(Alert.NAME, Alert);
};

export default Alert;
