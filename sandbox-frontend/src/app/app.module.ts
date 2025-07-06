import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { UsersModule } from "./features/users/users.module";
import { TasksModule } from "./features/tasks/tasks.module";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { provideZoneChangeDetection, inject, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment.development';


registerLocaleData(es);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        UsersModule,
        TasksModule,
        NzLayoutModule,
        RouterModule.forRoot(routes)
    ],
    providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideApollo(() => {
        const httpLink = inject(HttpLink);
    
        return {
          link: httpLink.create({
            uri: environment.apiUrl,
          }),
          cache: new InMemoryCache(),
        };
      }), provideNzI18n(es_ES), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule {}