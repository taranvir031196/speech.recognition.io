import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Output,
} from '@angular/core';
import { ControlerBase } from '../base/controler-base';
import {
  commentHandler,
  GLOBAL_COMMAND,
  parseNumericTextToNumber,
} from '../base/helper-class';
import { controlType, inputType, TabData } from '../Interface/tab-data-model';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent extends ControlerBase {

  constructor(
    // private serviceInt: VoiceRecognizion,
    private refInit: ChangeDetectorRef
  ) {
    super(
      // serviceInt, 
      refInit);
    this.controlType = controlType.global;
  }
  public tabIndex = 0;
  public name = '';
  public listerning = false;
  public type = '';
  public message = '';
  public previousFinalData = '';
  public controlType: any;
  public globalCommand: any;
  command = '';
  tabData: TabData[] = [
    { index: 0, active: false, type: inputType.text },
    { index: 1, active: false, type: inputType.text },
    { index: 2, active: false, type: inputType.text },
    { index: 3, active: false, type: inputType.dropdown },
    { index: 4, active: false, type: inputType.checkbox, name: 'Taxpayer' },
    { index: 5, active: false, type: inputType.button, name: 'Stop' },
  ];

  currentActiveField = 0;

  focusout(index: number) {
    if (index < this.tabData.length) {
      this.focusInInput(index);
    } else {
      this.focusInInput(0);
    }
  }

  executeFunction(event: string) {
    if (event == 'stop') {
      this.stopButtom();
    }
  }

  test() {
    this.focusInInput(1);
  }

  focusInInput(index: number) {
    this.tabData[index].active = true;
    this.tabData[index] = { ...this.tabData[index] };
    this.currentActiveField = index;
    this.ref.detectChanges();
  }
  // TODO// do we need this insted cant we do it to simple stop service?, need to check the listerning getting off in the listering input if we remove this
  stopButtom() {
    this.tabData[this.currentActiveField].active = false;
    this.tabData[this.currentActiveField] = {
      ...this.tabData[this.currentActiveField],
    };
  }

  executingGlobalCommand(message: string) {
    this.localCommandHandler(message);
  }

  protected localCommandHandler(message: string) {
    if (commentHandler(GLOBAL_COMMAND.stopButton, message)) {
      this.executeFunction('stop');
    } else if (commentHandler(GLOBAL_COMMAND.focus, message)) {
      let processedMessage: number | undefined = parseNumericTextToNumber(message);
      if (
        processedMessage != undefined &&
        processedMessage < this.tabData.length
      ) {
        this.focusInInput(processedMessage);
      }
    }
  }
}
