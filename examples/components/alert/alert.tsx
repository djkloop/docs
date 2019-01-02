import { Component } from 'vue-property-decorator';
import * as tsx from 'vue-tsx-support';
import Button from '../button';
const COMPONENT_NAME = 'AAleart';

interface AleartProps {
  text: string;
}

@Component({
  name: 'AAleart',
})
export default class Alert extends tsx.Component<AleartProps> {
  static NAME = COMPONENT_NAME;
  public text = 'nihaoxxxx1aaaxadsad';
  public fuck = 'cuckk!!!1xxx';
  public render() {
    return (
      <div>
        <Button />
        <div>
          1xxxx
          { this.fuck }
          <br />
          我是alert组件 { this.text }
        </div>
      </div>
    );
  }
}

