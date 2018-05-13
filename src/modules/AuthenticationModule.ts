import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationModule{

    constructor(private afAuth: AngularFireAuth){

    }


    public checkAuthentication(): Observable<firebase.User>{
        return this.afAuth.authState;
    }

    public login(): Promise<any>{
        return this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider);
    }
}