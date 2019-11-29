import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DataUploadComponent } from './data-upload/data-upload.component';
import { AdminEdibleTreeListingComponent } from './admin-edible-tree-listing/admin-edible-tree-listing.component';
import { CampusComponent } from './campus/campus.component';
const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: "", redirectTo: "edible-tree-listing", pathMatch: "full" },
            { path: "data-upload", component: DataUploadComponent },
            { path: "edible-tree-listing", component: AdminEdibleTreeListingComponent }
        ]
    },
    {
        path: '',
        component: CampusComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{ }