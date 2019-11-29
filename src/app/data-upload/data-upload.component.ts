import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { EdibleTree } from '../../models/EdibleTree';
import { DatabaseModule } from '../../modules/DatabaseModule';
import { Utils } from '../../modules/Utils';
import Swal from 'sweetalert2'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap, take, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Constants} from '../../modules/Constants';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css']
})
export class DataUploadComponent implements OnInit {

  displayFileInput: boolean;

  fileSelected: boolean;

  excelUpload: boolean;

  imageUpload: boolean;

  task: AngularFireUploadTask;

  percentage: Observable<number>;

  snapshot: Observable<any>;

  downloadUrl: Observable<string>;

  isHovering: boolean;

  speciesListing: Array<EdibleTree>;

  countryColors: Array<string>;

  imageUploadProgress: number;

  imageMap: Map<string, string>;

  imageList: FileList;

  uploading: boolean;

  uploadPercentage: number;

  readonly AUSTRALASIA: string = "australasia";
  readonly AFRICA: string = "africa";
  readonly ASIA: string = "asia";
  readonly CARIBBEAN: string = "caribbean";
  readonly TROPICAL_AMERICAS: string = "tropical americas";

  constructor(private dbModule: DatabaseModule, private utils: Utils, private storage: AngularFireStorage, private constants: Constants) {
    this.displayFileInput = false;

    this.fileSelected = false;

    this.uploading = false;
    this.uploadPercentage = 0;
  }

  ngOnInit() {
    this.excelUpload = true;
    this.imageUpload = false;

    this.imageUploadProgress = 0;
    this.imageMap = new Map<string, string>();
  }

  readExcel(evt: any){
    console.log("File Received");
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      let data = <Array<Array<any>>>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.speciesListing = this.formatToEdibleTrees(data);
      let numTress = this.speciesListing.length;
      let alertMessage = 'Successfully retrieved ' + numTress + ' trees data.';

      Swal({
        type: 'success',
        title: 'Excel Upload',
        text: alertMessage,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'OK',
        cancelButtonText: 'Re-Upload Excel sheet'
      }).then((result) => {
        if(result.value){
          this.excelUpload = false;
          this.imageUpload = true;
        }
      })
      
    };
    reader.readAsBinaryString(target.files[0]);
  }

  returnToExcelUpload(){
    this.excelUpload = true;
    this.imageUpload = false;
  }

  beginDataUpload(){
    this.uploading = true;
    let percentageObservable = this.startFileUpload(this.imageList, this.speciesListing);


    percentageObservable.subscribe((data) => {
      this.imageUploadProgress = data;
      this.uploadPercentage = data;
    })
  }

  startUpload(event: FileList){

    this.imageList = event;

    let promises: Array<Promise<any>> = [];

    this.imageMap = new Map<string, string>();

    for(let i = 0; i < event.length; i++){
      

      let currentFilePromise = new Promise(resolve => {
        let reader = new FileReader();
        let currentName = event[i].name.split('.')[0];
        reader.readAsDataURL(event[i]);

        reader.onload = (myEvent) => {
          this.imageMap.set(currentName, myEvent.target.result);
          resolve(myEvent.target.result);
        }
      })

      promises.push(currentFilePromise);
    }

    let numImages = event.length;

    let sucessMessage = "Successfully read " + numImages + "images.";

    Promise.all(promises).then(() => {
      Swal({
        type: 'success',
        title: 'Image Upload',
        text: sucessMessage,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'OK',
        cancelButtonText: 'Re-Upload Excel sheet'
      }).then((result) => {
        if(result.value){
          console.log('Okay Clicked');
        }
      })
    })

  }


  formatToEdibleTrees(data: Array<Array<any>>): Array<EdibleTree>{
    let edibleTrees: Array<EdibleTree> = new Array<EdibleTree>();

    data.splice(0, 1);
 
    for(let row of data){
      let current = new EdibleTree(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8]);
      edibleTrees.push(current);
    }

    return edibleTrees;

  }

  setStyles(speciesOrigin: string){
    let origin_seperated = speciesOrigin.toLowerCase().split(',');
    let styles = {};
    let currentColor: string;
    if(origin_seperated[0].localeCompare(this.AFRICA) === 0){
      currentColor = this.constants.AFRICA_COLOR;
    }
    else if(origin_seperated[0].localeCompare(this.ASIA) === 0){
      currentColor = this.constants.ASIA_COLOR;
    }
    else if(origin_seperated[0].localeCompare(this.AUSTRALASIA) === 0){
      currentColor = this.constants.AUSTRALASIA_COLOR;
    }
    else if(origin_seperated[0].localeCompare(this.CARIBBEAN) === 0){
      currentColor = this.constants.CARIBBEAN_COLOR;
    }
    else if(origin_seperated[0].localeCompare(this.TROPICAL_AMERICAS) === 0){
      currentColor = this.constants.TROPICAL_AMERICAS;
    }

    if(origin_seperated.length === 1){  
      styles = {
        'background-color': currentColor
      }
    }
    else{
      let secondColor: string;

      if(origin_seperated[1].localeCompare(this.AFRICA) === 0){
        secondColor = this.constants.AFRICA_COLOR;
      }
      else if(origin_seperated[1].localeCompare(this.ASIA) === 0){
        secondColor = this.constants.ASIA_COLOR;
      }
      else if(origin_seperated[1].localeCompare(this.AUSTRALASIA) === 0){
        secondColor = this.constants.AUSTRALASIA_COLOR;
      }
      else if(origin_seperated[1].localeCompare(this.CARIBBEAN) === 0){
        secondColor = this.constants.CARIBBEAN_COLOR;
      }
      else if(origin_seperated[1].localeCompare(this.TROPICAL_AMERICAS) === 0){
        secondColor = this.constants.TROPICAL_AMERICAS;
      }

      styles = {
        'background': 'linear-gradient(to right, '+currentColor+' 50%, '+secondColor+' 50%)'
      }
    }
    return styles;
  }

  private validateBooleanField(value: string): boolean{
    if(value.localeCompare("Yes") === 0)
      return true;
    else if(value.localeCompare("No") === 0)
      return false;

    else throw new Error("Invalide Boolean Field Data");
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
                let currentSpecies = this.dbModule.findSpecies(speciesListing, file.name);
                currentSpecies.setImageURL(url);
                if(currentSpecies.getOtherNames() === null){
                  currentSpecies.setOtherNames("");
                }
                this.dbModule.saveSpecies(currentSpecies);
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
