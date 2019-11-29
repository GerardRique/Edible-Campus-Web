import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, filter, switchMap, take, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { EdibleTree } from 'src/models/EdibleTree';

@Injectable()
export class DatabaseModule{

    constructor(private afdb: AngularFireDatabase, private storage: AngularFireStorage){

    }


    public pushData(data: Array<Object>): Promise<boolean>{

        let promises = [];
        let ref = this.afdb.list('EdibleTrees');

        for(let current of data){
            promises.push(ref.push(current));
        }

        return Promise.all(promises).then(() => {
            return true;
        }).catch((error) => {
            return false;
        })

    }

    public retrieveAllSpecies(): Observable<any>{
        let speciesRef = this.afdb.list('species');

        return speciesRef.valueChanges();
    }

    public findSpecies(speciesListing: Array<EdibleTree>, fileName: string): EdibleTree{
        console.log(speciesListing);
        console.log(fileName);
        let filenameSplit = fileName.split('.');
        let fileNameNoExt = filenameSplit[0];
        console.log(fileNameNoExt);
        for(let species of speciesListing){
            if(fileNameNoExt.localeCompare(species.getName()) === 0){
                return species;
            }
        }
        return null;
    }

    public saveSpecies(species: EdibleTree){
        let speciesRef = this.afdb.list('species');
        if(species.getOtherNames() === undefined || species.getOtherNames() === null){
            species.setOtherNames("_");
        }
        speciesRef.push(species);
    }

    public startFileUpload(event: FileList, speciesListing: Array<EdibleTree>){
        

        let tasks = Array<AngularFireUploadTask>();
        let percentages: Observable<any>[] = [];

        let mainPercentage: Observable<any>;

        let uploads: Array<any> = new Array<any>();

        for(let i = 0; i < event.length; i++){
            let file = event.item(i); 

            let path = 'edible_campus_species/' + file.name;

            let task = this.storage.upload(path, file);

            const _percentage$ = task.percentageChanges();
            percentages.push(_percentage$);

            const uploadData = {
                'fileName': file.name,
                'percentageCompleted': _percentage$
            };

            uploads.push(uploadData);

            const _t = task.then((f) => {
                return f.ref.getDownloadURL().then((url) => { 
                    let currentSpecies = this.findSpecies(speciesListing, file.name);
                    currentSpecies.setImageURL(url);
                    this.saveSpecies(currentSpecies);
                })
            })

        }

        mainPercentage = combineLatest(percentages).pipe(map((percentageList) => {
            let result: number = 0;
            for(const currentPercentage of percentageList){
                result = result + currentPercentage;
            }

            return result/percentageList.length;
        }), tap(console.log));

        return mainPercentage;

        
    }

}