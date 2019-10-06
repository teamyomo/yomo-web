import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-splitter',
    template: `
        <ng-content select="[left-pane]"></ng-content>
        <div #resizer class="resizer" (mousedown)="handleMousedown($event)">. . .</div>
        <ng-content select="[right-pane]"></ng-content>
    `,
    styles: [
        `
            :host {
                display: grid;
                height: 100%;
            }
            .resizer {
                cursor: ew-resize;
                display: flex;
                align-items: center;
                font-size: 47px;
                line-height: 16px;
                text-align: center;
            }
        `
    ]
})
export class SplitterComponent {
    private _width: number = 0.8;
    private splitterWidth = '15px';

    @ViewChild('resizer', { static: true })
    public resizer: ElementRef<HTMLDivElement>;

    @HostBinding('style.grid-template-columns')
    public gridTemplate: string = '';

    @Input()
    public set width(value: number) {
        this._width = value;
        this.updateGridTemplate();
    }

    @Output()
    public widthChange = new EventEmitter<number>();

    constructor(private host: ElementRef<HTMLElement>) {
        this.updateGridTemplate();
    }

    public handleMousedown(evt: MouseEvent) {
        const windowWidth = window.innerWidth,
            startW = this.resizer.nativeElement ? this.resizer.nativeElement.offsetLeft : undefined;

        if (startW !== undefined) {
            this.beginResize(startW, windowWidth, evt.x);
            evt.preventDefault();
        }
    }

    private updateGridTemplate() {
        this.gridTemplate = `${this._width * 100}% ${this.splitterWidth} auto`;
        if (this.host.nativeElement) {
            this.host.nativeElement.style.gridTemplateColumns = this.gridTemplate;
        }
    }

    private beginResize(startW: number, windowWidth: number, startX: number) {
        const onMove = (evt: MouseEvent) => {
                const delta = evt.x - startX,
                    newPos = startW + delta,
                    newWidth = Math.min(1, Math.max(0, newPos / windowWidth));
                console.log(startW, windowWidth, startX, evt.x, delta, newPos, newWidth);
                this.widthChange.emit(newWidth);
            },
            onMseUp = () => {
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', onMseUp);
            };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onMseUp);
    }
}
