import { Component, Optional } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'proerp-help-index',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.css']
})

export class CouriersComponent {
    constructor(
            private route: ActivatedRoute,
            private router: Router
        ) { }

     goTolistcourier(){
        this.router.navigate(['/courier-index/listcourier']);
    }   
}