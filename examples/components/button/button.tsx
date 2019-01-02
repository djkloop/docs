import { Component, Vue } from 'vue-property-decorator';
const COMPONENT_NAME = 'AButton';
@Component({
  name: COMPONENT_NAME,
})
export default class Button extends Vue {
  static NAME = COMPONENT_NAME;
  public render() {
    return (
      <button>
        我是button组件!xxx
      </button>
    );
  }
}
