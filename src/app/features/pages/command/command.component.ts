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
                <div class="hud">
                    <div class="left"></div>
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
                                    <span>{{ getBatteryLevel() }}</span> <i class="fa fa-power"></i>
                                </div>
                            </div>
                            <i class="fa fa-2x fa-car-battery"></i>
                        </div>
                    </div>
                </div>
                <div class="controls">
                    <div>
                        <div class="deck-height">
                            <i class="fa fa-2x fa-arrow-circle-up"></i>
                            <mat-slider
                                [min]="1"
                                [thumbLabel]="true"
                                [max]="20"
                                [step]="1"
                                [displayWith]="toCm"
                                vertical="vertical"
                                [(value)]="model.mower.deckHeight"
                            ></mat-slider>
                            <div class="mat-caption">Deck height</div>
                        </div>
                    </div>
                    <div class="stop-container">
                        <button class="stop mat-elevation-z8" mat-raised-button color="warn" (click)="model.mower.stop()">All Stop</button>
                    </div>
                    <div class="lesser-controls">
                        <mat-form-field class="mode-selector">
                            <mat-label>Select Mode</mat-label>
                            <mat-select [(value)]="selectedMode" color="accent">
                                <mat-option *ngFor="let mode of modes" [value]="mode">{{ mode.name }}</mat-option>
                            </mat-select>
                        </mat-form-field>
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
                grid-template-columns: 10% 60% 30%;
            }
            .hud {
                display: grid;
                grid-template-columns: 20% auto 20%;
                padding-bottom: 1rem;
            }
            .stop {
                font-size: 4vw;
                border-radius: 2vw;
                height: 100%;
                width: 100%;
            }
            .power {
                font-size: 2vw;
                width: 100%;
            }
            .lesser-controls {
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
            .battery-level span {
                font-weight: bold;
                mix-blend-mode: difference;
            }
            .stop-container {
                padding: 0 1rem;
            }
            .deck-height {
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 1rem;
                box-sizing: border-box;
                border-radius: 1rem;
                background: #fff1;
                text-align: center;
            }
            .speed ::ng-deep svg > g > text {
                fill: #fff;
            }
            .mode-selector {
                width: 100%;
                border-radius: 1rem;
                padding: 1rem;
                box-sizing: border-box;
                margin-bottom: 1rem;
                background: #fff1;
            }
        `
    ]
})
export class CommandComponent implements OnInit {
    @Input()
    public model!: Command;

    public selectedMode: { name: string };
    public modes: { name: string }[] = [];

    constructor() {}

    ngOnInit() {
        this.modes = [{ name: 'Manual Steer' }, ...this.model.mower.regions.map(r => ({ name: 'Autonomous ' + r.name }))];
        this.selectedMode = this.modes[0];
    }

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
        return `linear-gradient(transparent ${pct}%, #fff ${pct}%)`;
    }

    public toCm(value: number) {
        return value + 'cm';
    }
}
