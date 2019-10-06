import { Component, OnInit, Input } from '@angular/core';
import { IPage } from '../types';
import { Mower } from 'src/app/models/mower';

export class Regions implements IPage {
    public name = 'Regions';

    public paneWidth = 0.8;

    constructor(public mower: Mower) {}
}

@Component({
    selector: 'app-regions',
    template: `
        <app-splitter [(width)]="model.paneWidth">
            <div left-pane></div>
            <div right-pane>
                <app-status [status]="model.mower.status"></app-status>
            </div>
        </app-splitter>
    `,
    styles: [``]
})
export class RegionsComponent implements OnInit {
    @Input()
    public model!: Regions;

    constructor() {}

    ngOnInit() {}
}
