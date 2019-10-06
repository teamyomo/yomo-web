import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-status',
    template: `
        <div class="title">Status</div>
        <div *ngFor="let item of status" class="row">
            <span class="label">{{ item.label }}</span>
            <span class="value">{{ item.value }}</span>
        </div>
    `,
    styles: [
        `
            :host {
                background: #fff1;
                display: block;
                height: 100%;
            }
            .title {
                background: #fff2;
                font-size: 1.3rem;
                color: #fffa;
                padding: 1rem;
            }
            .label {
                color: #fff7;
                margin: 0 1rem;
            }
            .value {
                color: #fffe;
                font-weight: bold;
            }
            .row {
                white-space: nowrap;
                margin: 1rem 0;
            }
        `
    ]
})
export class StatusComponent implements OnInit {
    @Input()
    public status: { label: string; value: string }[] = [];

    constructor() {}

    ngOnInit() {}
}
