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
            <i class="fa fa-2x fa-arrow-alt-circle-right"></i>
            <mat-slider [min]="0" [max]="1" [step]="0.01" vertical="vertical" [(value)]="model.mower.leftThrottle"></mat-slider>
        </div>
        <div class="middle">
            <div class="dash">
                <div class="left">
                    <div class="battery-container">
                        <div class="battery">
                            <div class="battery-level" [style.background]="getBatteryLife()">{{ getBatteryLevel() }} <i class="fa fa-power"></i></div>
                        </div>
                        <i class="fa fa-2x fa-car-battery"></i>
                    </div>
                </div>
                <div class="hud">
                    <div class="height"></div>
                    <div class="speed">
                        <ngx-charts-gauge
                            [min]="0"
                            [max]="2"
                            [angleSpan]="240"
                            [startAngle]="-120"
                            [animations]="false"
                            units="m/s"
                            [results]="getSpeedData()"
                        ></ngx-charts-gauge>
                    </div>
                    <div class="right">
                        <div class="battery-container">
                            <div class="battery">
                                <div class="battery-level" [style.background]="getBatteryLife()">
                                    {{ getBatteryLevel() }} <i class="fa fa-power"></i>
                                </div>
                            </div>
                            <i class="fa fa-2x fa-car-battery"></i>
                        </div>
                    </div>
                </div>
                <div class="controls">
                    <button class="stop mat-elevation-z8" mat-raised-button color="warn" (click)="model.mower.stop()">All Stop</button>
                    <div class="lesser-controls">
                        <mat-select [(value)]="model.mower.currentRegion">
                            <mat-option [value]="undefined">Manual Steer</mat-option>
                            <mat-option *ngFor="let region of model.mower.regions" [value]="region">Autonomous {{ region.name }}</mat-option>
                        </mat-select>
                        <button
                            class="stop mat-elevation-z8"
                            class="power"
                            mat-raised-button
                            [color]="getPowerButtonColor()"
                            (click)="model.mower.togglePower()"
                        >
                            Mower {{ model.mower.mowerState.toUpperCase() }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="throttle">
            <i class="fas fa-2x fa-arrow-alt-circle-left"></i>
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
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 8vw;
            }
            .middle {
                padding: 50px 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .throttle i {
                color: #0006;
            }
            .middle {
                flex: 1 1 auto;
            }
            .dash {
                width: 60vw;
                height: 40vw;
                display: grid;
                grid-template-rows: auto 40%;
            }
            .controls {
                display: grid;
                grid-template-columns: 60% 40%;
            }
            .hud {
                display: grid;
                grid-template-columns: 20% auto 20%;
                padding-bottom: 1rem;
            }
            .stop {
                font-size: 4vw;
                border-radius: 2vw;
            }
            .power {
                font-size: 2vw;
                width: 100%;
            }
            .lesser-controls {
                padding-left: 1vw;
            }
            .battery-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
            }
            .battery {
                height: 100%;
                border-radius: 1rem;
                background: #fff1;
                display: flex;
                width: 6vw;
                flex: 1 1 100%;
            }
            .battery-level {
                border-radius: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
            }
            .speed {
            }
        `
    ]
})
export class CommandComponent {
    @Input()
    public model!: Command;

    constructor() {}

    public getPowerButtonColor() {
        return this.model.mower.mowerState === 'on' ? 'accent' : 'none';
    }

    public getSpeedData() {
        return [{ name: 'Speed', value: this.model.mower.speed }];
    }

    public getBatteryLevel() {
        const pct = Math.round(this.model.mower.battery * 100);
        return `${pct}%`;
    }

    public getBatteryLife() {
        const pct = (1 - this.model.mower.battery) * 100;
        return `linear-gradient(transparent ${pct}%, green ${pct}%)`;
    }
}
