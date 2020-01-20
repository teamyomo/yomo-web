import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MobxAngularModule } from 'mobx-angular';

import { AppComponent } from './app.component';
import { NavigationComponent } from './features/navigation/navigation.component';
import { StatusComponent } from './features/components/status.component';
import { ShellComponent } from './features/shell/shell.component';
import { CommandComponent } from './features/pages/command/command.component';
import { RegionsComponent } from './features/pages/regions/regions.component';
import { SetupComponent } from './features/pages/setup/setup.component';
import { SplitterComponent } from './features/components/splitter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThrottleSliderComponent } from './features/components/throttle-slider.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        StatusComponent,
        ShellComponent,
        CommandComponent,
        RegionsComponent,
        SetupComponent,
        SplitterComponent,
        ThrottleSliderComponent
    ],
    imports: [
        BrowserModule,
        MobxAngularModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatTabsModule,
        MatToolbarModule,
        NgxChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
