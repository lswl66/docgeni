import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DocgeniTemplateModule } from "@docgeni/template";
import { DOCGENI_SITE_PROVIDERS, RootComponent, EXAMPLE_MODULES } from './content/index';
@NgModule({
    declarations: [],
    imports: [BrowserModule, DocgeniTemplateModule, RouterModule.forRoot([]), ...EXAMPLE_MODULES],
    providers: [...DOCGENI_SITE_PROVIDERS],
    bootstrap: [RootComponent]
})
export class AppModule {
    constructor() {}
}
