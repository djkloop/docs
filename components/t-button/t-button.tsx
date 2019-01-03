import { Component, Vue } from 'vue-property-decorator';
const COMPONENT_NAME = 'TButton';
@Component({
  name: COMPONENT_NAME,
})
export default class TButton extends Vue {
  static NAME = COMPONENT_NAME;
  public render() {
    return (
      <button>
        我是t-button组件!xxx--1xxx
      </button>
    );
  }
}
