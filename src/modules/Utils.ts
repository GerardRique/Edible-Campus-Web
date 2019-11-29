import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class Utils{
    constructor(){

    }

    isExcel(file): boolean{
        if(file.type != null && file.type.localeCompare("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") === 0){
            return true;
        }
        return false;
    }
}