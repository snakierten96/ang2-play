import { Injectable } from '@angular/core';

import { Hero }   from './hero';
import { HEROES } from './mock-heroes';
import { Logger } from '../logger.service';

@Injectable()
export class HeroService {
  
  constructor(private logger: Logger) { }
  
  getHeroes() {
    this.logger.log('Getting Heroes');
    return Promise.resolve(HEROES);
  }
    
  getHero(id: number) {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }
}