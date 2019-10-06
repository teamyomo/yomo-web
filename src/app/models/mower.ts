import { observable, action } from 'mobx';
import { MowerConnection } from '../services/mower-connection';
import { Region } from './region';

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
    public speed: number = 0.8;

    @observable
    public turn: number = 4;

    @observable
    public deckWidth: number = 0.4;

    @observable
    public deckHeight: number = 8;

    @observable
    public overlap: number = 50;

    @observable
    public antennaDx: number = 0;

    @observable
    public antennaDy: number = 0;

    @observable
    public regions: Region[] = [];

    @observable
    public battery: number = 0.74;

    @observable
    public currentRegion?: Region;

    public async init() {
        this.conn = new MowerConnection();
        this.conn.receivedUpdate.subscribe((evt: { command: string; args: any[] }) => {
            if (evt.command === 'status') {
                this.status = evt.args;
            } else if (evt.command === 'data') {
                this.loadData(evt.args[0]);
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

    public async togglePower() {
        await this.power(this.mowerState === 'on' ? 'off' : 'on');
    }

    private loadData(data: Partial<Mower>) {
        const regions = data.regions;
        if (regions) {
            this.regions = data.regions.map(r => Region.load(r as Partial<Region>));
            delete data.regions;
        }
        for (const key of Object.keys(data)) {
            this[key] = data[key];
        }
    }
}
