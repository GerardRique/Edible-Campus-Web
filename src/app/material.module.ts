import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatProgressBarModule, MatStepperModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule, MatListModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatSidenavModule, MatGridListModule, LayoutModule, MatListModule, MatDialogModule, MatProgressBarModule, MatStepperModule],
    exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatSidenavModule, MatGridListModule, LayoutModule, MatListModule, MatDialogModule, MatProgressBarModule, MatStepperModule],
})

export class MaterialModule{ }