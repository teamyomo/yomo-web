import { observable, action } from 'mobx';
import { MowerConnection } from '../services/mower-connection';

export class Mower {
    private conn: MowerConnection;

    @observable
    public leftThrottle = 0.5;

    @observable
    public rightThrottle = 0.5;

    @observable
    public mode: 'manual' | 'autonomous' = 'manual';

    @observable
    public mowerState: 'on' | 'off' = 'on';

    @observable
    public status: { label: string; value: string }[] = [];

    @observable
    public speed: number = 4;

    @observable
    public turn: number = 4;

    @observable
    public deckWidth: number = 0.4;

    @observable
    public overlap: number = 50;

    @observable
    public antennaDx: number = 0;

    @observable
    public antennaDy: number = 0;

    public async init() {
        this.conn = new MowerConnection();
        this.conn.receivedUpdate.subscribe((evt: { command: string; args: any[] }) => {
            if (evt.command === 'status') {
                this.status = evt.args;
            }
        });
        await this.conn.connect();
    }

    @action
    public stop() {
        this.leftThrottle = 0;
        this.rightThrottle = 0;
    }

    public async power(value: 'on' | 'off') {
        this.mowerState = value;
    }
}
