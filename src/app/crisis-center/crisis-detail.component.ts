import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Crisis }         from './crisis.service';
import { DialogService }  from '../dialog.service';
import { Observable }     from 'rxjs/Observable';

@Component({
  templateUrl: 'app/crisis-center/crisis-detail.component.html',
  styleUrls: ['app/crisis-center/crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  crisis: Crisis;
  editName: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
    ) { }
    
  ngOnInit() {
    this.route.data.forEach((data: { crisis: Crisis }) => {
      this.editName = data.crisis.name;
      this.crisis = data.crisis
    });
  }

  cancel() {
    this.gotoCrises();
  }
  
  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or unchanged
    if ( !this.crisis || this.crisis.name === this.editName ) {
      return true;
    }
    // Otherwise ask the user with the DialogService and return
    // it's Promise result
    return this.dialogService.confirm('Discard changes?');
  }
  
  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    this.router.navigate(['/crisis-center', { id: crisisId }])
  }

}