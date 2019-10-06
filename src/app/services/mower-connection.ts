import { EventEmitter } from '@angular/core';

export class MowerConnection {
    public receivedUpdate = new EventEmitter<{ command: string; args: any[] }>();

    public async connect() {
        // dummy stuff going on
        this.receive('status', [
            { label: 'Activity', value: 'MOWING' },
            { label: 'Nav Area', value: 'NE-3.4 lot' },
            { label: 'Nat Type', value: 'Grid NW/SW' },
            { label: 'Position', value: '30.1m NNE' },
            { label: 'Velocity', value: '3.2 m/s' },
            { label: 'Heading', value: '43.2°' },
            { label: 'OAT', value: '23.3°' },
            { label: 'Amps I/O', value: '7.3/7.6A' },
            { label: 'Volts', value: '27.1v' },
            { label: 'Days Active', value: '23.5days' },
            { label: 'Total Time', value: '123.1days' }
        ]);
    }

    private send(command: string, args: any[]) {}
    private receive(command: string, args: any[]) {
        this.receivedUpdate.emit({ command, args });
    }
}
