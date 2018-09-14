import {Component, Input, Output, EventEmitter} from '@angular/core'

@Component({
    templateUrl:'confirm-modal.component.html',
    selector: 'confirm'
})
export class ConfirmModalComponent {

    @Input()
    header: string;

    @Input()
    body: string;

    @Input()
    dataTarget: string;

    @Input()
    data: any;

    @Output()
    onConfirm: EventEmitter<any> = new EventEmitter<any>();

    onConfirmClick(){
        this.onConfirm.emit(this.data);
    }

}