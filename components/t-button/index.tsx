import TButton from './t-button';

(TButton as any).install = (Vue: any) => {
  Vue.component(TButton.NAME, TButton);
};

export default TButton;
