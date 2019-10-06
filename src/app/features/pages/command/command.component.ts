import { Component, OnInit, Input } from '@angular/core';
import { IPage } from '../types';
import { Mower } from 'src/app/models/mower';

export class Command implements IPage {
    public name = 'Command';

    constructor(public mower: Mower) {}
}

@Component({
    selector: 'app-command',
    template: `
        <div class="throttle">
            <mat-slider [min]="0" [max]="1" [step]="0.01" vertical="vertical" [(value)]="model.mower.leftThrottle"></mat-slider>
        </div>
        <div class="middle"></div>
        <div class="throttle">
            <mat-slider [min]="0" [max]="1" [step]="0.01" vertical="vertical" [(value)]="model.mower.rightThrottle"></mat-slider>
        </div>
    `,
    styles: [
        `
            :host {
                display: flex;
                height: 100%;
            }
            .mat-slider-vertical {
                height: 100%;
            }
            .throttle {
                flex: 0 0 auto;
                padding: 50px 0;
                background: #0001;
            }
            .middle {
                flex: 1 1 auto;
            }
        `
    ]
})
export class CommandComponent implements OnInit {
    @Input()
    public model!: Command;

    constructor() {}

    ngOnInit() {}
}
