import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';
import { Subscription }          from 'rxjs/Subscription';

@Component({
  templateUrl: 'app/crisis-center/crisis-list.component.html',
  styleUrls: ['app/crisis-center/crisis-list.component.css']
})
export class CrisisListComponent implements OnInit, OnDestroy { 
  crises: Crisis[];
  private selectedId: number;
  private sub: Subscription;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router) { }

  isSelected(crisis: Crisis) { return crisis.id === this.selectedId; }

  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        this.selectedId = +params['id'];
        this.service.getCrises()
          .then(crises => this.crises = crises);
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSelect(crisis: Crisis) {
    this.router.navigate(['/crisis-center', crisis.id]);
  }
}
