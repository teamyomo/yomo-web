import { Component, OnInit } from '@angular/core';
import { IPage } from '../pages/types';
import { Command } from '../pages/command/command.component';
import { Regions } from '../pages/regions/regions.component';
import { Setup } from '../pages/setup/setup.component';
import { observable } from 'mobx';
import { Mower } from '../../models/mower';

class Shell {
    @observable
    public visiblePage: IPage;

    public command: Command;
    public regions: Regions;
    public setup: Setup;

    public pages: IPage[] = [this.command, this.regions, this.setup];

    constructor(public mower: Mower) {
        this.pages = [
            (this.visiblePage = this.command = new Command(this.mower)),
            (this.regions = new Regions(this.mower)),
            (this.setup = new Setup(this.mower))
        ];
    }
}

@Component({
    selector: 'app-shell',
    template: `
        <ng-container *ngIf="ready">
            <app-navigation [pages]="model.pages" [(visiblePage)]="model.visiblePage"></app-navigation>
            <app-command [model]="model.command" *ngIf="isVisible(model.command)"></app-command>
            <app-regions [model]="model.regions" *ngIf="isVisible(model.regions)"></app-regions>
            <app-setup [model]="model.setup" *ngIf="isVisible(model.setup)"></app-setup>
        </ng-container>
    `,
    styles: [
        `
            :host {
                display: grid;
                grid-template-rows: 64px auto;
                height: 100%;
            }
        `
    ]
})
export class ShellComponent implements OnInit {
    public mower: Mower;
    public model: Shell;

    public get ready() {
        return !!this.mower;
    }

    constructor() {}

    ngOnInit() {
        this.start();
    }

    public isVisible(page: IPage) {
        return this.model.visiblePage === page;
    }

    private async start() {
        this.mower = new Mower();
        await this.mower.init();
        this.model = new Shell(this.mower);
    }
}
