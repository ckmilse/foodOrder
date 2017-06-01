import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    NgModule,
    ApplicationRef
} from '@angular/core';
import {
    removeNgStyles,
    createNewHosts,
    createInputTransfer
} from '@angularclass/hmr';
import {
    RouterModule,
    PreloadAllModules
} from '@angular/router';

// import { ModalModule } from 'ng2-bootstrap';
import { DisabledDirective } from './directives/disabled.directive';
import { HideDirective } from './directives/hide.directive';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import {
    RealTimeTrackingComponent,
    TrackDetailComponent,
    NoContentComponent} from './pages';

import { MaterialModule } from '@angular/material';
import {
    NavbarComponent,
    FooterComponent,
    // ServerHostDetailComponent,
    // LogHistoryComponent,
    loadingComponent,
    TimeComponent
} from './common/components';


/*
    add some lib  or commont css here
*/
import './../styles/appCommon.scss';
import './../styles/appCommon.css';
// import './../assets/lib/bootstrap/css/bootstrap.css';
// import './../assets/lib/xcConfirm/css/xcConfirm.css';
// import './../assets/lib/sweetAlert/css/sweet-alert.css';
// import './../assets/lib/datetimepicker/datetimepicker.min.css';
// import './../assets/lib/adminTheme/css/sb-admin-2.css';
// import './../assets/lib/metisMenu/metisMenu.css';
// import './../assets/lib/font-awesome/css/font-awesome.css';
// import '@angular/material/core/theming/prebuilt/indigo-pink.css'

const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState
];

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        loadingComponent,
        // HomeComponent,
        // indexModule,
        NoContentComponent,
        RealTimeTrackingComponent,
        NavbarComponent,
        FooterComponent,
        TrackDetailComponent,
        // LogHistoryComponent,
        DisabledDirective,
        TimeComponent,
        HideDirective,
        // XLargeDirective
    ],
    entryComponents: [loadingComponent],
    imports: [ // import Angular's modules
        BrowserModule,
        MaterialModule,
        FormsModule,
        HttpModule,
        // indexModule,
        // ModalModule.forRoot(),
        // NgbModule.forRoot(),
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS
    ]
})
export class AppModule {

    constructor(
        public appRef: ApplicationRef,
        public appState: AppState
    ) { }

    public hmrOnInit(store: StoreType) {
        if (!store || !store.state) {
            return;
        }

        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    public hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    public hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }

}
