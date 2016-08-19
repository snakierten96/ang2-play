import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/hero/hero-list.component.html',
  styleUrls: ['app/hero/hero-list.component.css']
})
export class HeroListComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  selectedHero: Hero;
  
  constructor(
    private router: Router,
    private heroService: HeroService) { }
      
  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  
  ngOnInit() {
    this.getHeroes();   
  }
  
  ngOnDestroy() {
    
  }
  
  onSelect(hero: Hero) { this.selectedHero = hero; }

  gotoDetail() {
    this.router.navigate(['/hero', this.selectedHero.id])
  }    
}