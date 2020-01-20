import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-throttle-slider',
    template: `
        <div class="requested-speed"></div>
        <div class="actual-speed"></div>
        <div class="handle" [style.top]="getHandlePos()" (mousedown)="startDrag($event)"></div>
    `,
    styles: [
        `
            :host {
                width: 5px;
                height: 100%;
                display: block;
                position: relative;
                background: #0005;
            }
            div {
                position: absolute;
            }
            .handle {
                cursor: grab;
                margin-top: -1vh;
                margin-left: -1vw;
                height: 2vh;
                width: 2vw;
                border-radius: 0.25vh;
                background: #69f0ae;
                border: solid 1px #000b;
                box-shadow: 0 0 8px #0008;
            }
            .actual-speed {
            }
            .requested-speed {
            }
        `
    ]
})
export class ThrottleSliderComponent {
    private requestedSpeed = 0;

    constructor(private host: ElementRef<HTMLElement>) {}

    public getHandlePos() {
        return this.requestedSpeed * 50 + 50 + '%';
    }

    public startDrag(evt: MouseEvent) {
        if (this.host.nativeElement) {
            const bounds = this.host.nativeElement.getBoundingClientRect(),
                half = bounds.height / 2,
                center = bounds.top + bounds.height / 2,
                mouseMove = (move: MouseEvent) => {
                    const speed = Math.min(1, Math.max(-1, (move.y - center) / half));
                    this.requestedSpeed = speed;
                },
                mouseUp = () => {
                    window.removeEventListener('mouseup', mouseUp);
                    window.removeEventListener('mousemove', mouseMove);
                };

            window.addEventListener('mouseup', mouseUp);
            window.addEventListener('mousemove', mouseMove);
        }
    }
}
