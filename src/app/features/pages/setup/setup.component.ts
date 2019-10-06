import { Component, OnInit, Input } from '@angular/core';
import { IPage } from '../types';
import { Mower } from 'src/app/models/mower';

export class Setup implements IPage {
    public name = 'Setup';

    public paneWidth = 0.8;

    constructor(public mower: Mower) {}
}

@Component({
    selector: 'app-setup',
    template: `
        <app-splitter [(width)]="model.paneWidth">
            <div left-pane>
                <div class="setting">
                    <mat-form-field>
                        <span matPrefix>Speed &nbsp;</span>
                        <input matInput type="number" [(ngModel)]="model.mower.speed" />
                        <span matSuffix>(m/s)</span>
                    </mat-form-field>
                    <mat-slider [min]="0" [step]="0.5" [max]="12" [(ngModel)]="model.mower.speed"></mat-slider>
                </div>
                <div class="setting">
                    <mat-form-field>
                        <span matPrefix>Turn &nbsp;</span>
                        <input matInput type="number" [(ngModel)]="model.mower.turn" />
                        <span matSuffix>(m/s)</span>
                    </mat-form-field>
                    <mat-slider [min]="0" [step]="0.5" [max]="12" [(ngModel)]="model.mower.turn"></mat-slider>
                </div>
                <div class="setting">
                    <mat-form-field>
                        <span matPrefix>Deck Width &nbsp;</span>
                        <input matInput type="number" [(ngModel)]="model.mower.deckWidth" />
                        <span matSuffix>(m)</span>
                    </mat-form-field>
                    <mat-slider [min]="0" [step]="0.1" [max]="3" [(ngModel)]="model.mower.deckWidth"></mat-slider>
                </div>
                <div class="setting">
                    <mat-form-field>
                        <span matPrefix>Overlap &nbsp;</span>
                        <input matInput type="number" [(ngModel)]="model.mower.overlap" />
                        <span matSuffix>(mm)</span>
                    </mat-form-field>
                    <mat-slider [min]="0" [step]="1" [max]="100" [(ngModel)]="model.mower.overlap"></mat-slider>
                </div>
                <div class="setting">
                    <mat-form-field>
                        <span matPrefix>Antenna DX &nbsp;</span>
                        <input matInput type="number" [(ngModel)]="model.mower.antennaDx" />
                        <span matSuffix>(mm)</span>
                    </mat-form-field>
                    <mat-slider [min]="-100" [step]="1" [max]="100" [(ngModel)]="model.mower.antennaDx"></mat-slider>
                </div>
                <div class="setting">
                    <mat-form-field>
                        <span matPrefix>Antenna DY &nbsp;</span>
                        <input matInput type="number" [(ngModel)]="model.mower.antennaDy" />
                        <span matSuffix>(mm)</span>
                    </mat-form-field>
                    <mat-slider [min]="-100" [step]="1" [max]="100" [(ngModel)]="model.mower.antennaDy"></mat-slider>
                </div>
            </div>
            <div right-pane>
                <app-status [status]="model.mower.status"></app-status>
            </div>
        </app-splitter>
    `,
    styles: [
        `
            input {
                text-align: right;
            }
            .setting {
                display: flex;
                padding: 0 2rem;
                margin: 1.5rem 0;
                align-items: center;
            }
            .mat-slider {
                flex: 1 1 auto;
            }
            mat-form-field {
                width: 180px;
            }
        `
    ]
})
export class SetupComponent implements OnInit {
    @Input()
    public model!: Setup;

    constructor() {}

    ngOnInit() {}
}
