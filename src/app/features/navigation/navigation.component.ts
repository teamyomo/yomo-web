import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPage } from '../pages/types';

@Component({
    selector: 'app-navigation',
    template: `
        <mat-toolbar>
            <div class="fill"></div>
            <div class="menu">
                <ng-container *ngFor="let page of pages">
                    <a mat-flat-button [color]="getTabColor(page)" (click)="visiblePageChange.emit(page)">{{ page.name }}</a>
                </ng-container>
            </div>
            <div class="fill"></div>
        </mat-toolbar>
    `,
    styles: [
        `
            .fill {
                flex: 1 1 30%;
            }
            .menu {
                flex: 1 1 auto;
            }
            .mat-flat-button {
                width: 20vw;
                border-radius: 0;
                margin: 0 0.5px;
            }
        `
    ]
})
export class NavigationComponent implements OnInit {
    @Input()
    public pages: IPage[];

    @Input()
    public visiblePage: IPage;

    @Output()
    public visiblePageChange = new EventEmitter<IPage>();

    constructor() {}

    ngOnInit() {}

    public getTabColor(page: IPage) {
        return this.visiblePage === page ? 'accent' : undefined;
    }
}
