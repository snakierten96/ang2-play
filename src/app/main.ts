import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
//import { enableProdMode } from '@angular/core';       // prodMode import

//enableProdMode();                                     // prodMode call
browserDynamicPlatform().bootstrapModule(AppModule);