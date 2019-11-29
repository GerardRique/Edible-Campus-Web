import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatabaseModule } from '../../modules/DatabaseModule';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.css']
})
export class CampusComponent implements OnInit {

  constructor(private afdb: AngularFireDatabase, private db: DatabaseModule) { }

  ngOnInit() {
    this.db.retrieveAllSpecies().subscribe((action) => {
      console.log(action);
    })
  }

}
