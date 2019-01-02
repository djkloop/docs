import Button from './button';
(Button as any).install = (Vue: any) => {
  Vue.component(Button.NAME, Button);
};

export default Button;
