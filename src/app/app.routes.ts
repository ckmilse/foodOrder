
import { Routes } from '@angular/router';
// import { indexModule } from './pages/index';
import { NoContentComponent } from './pages/no-content';
import { RealTimeTrackingComponent, TrackDetailComponent } from './pages';
import { DataResolver } from './app.resolver';
import { IndexComponent} from './pages/index/index.component.ts';
export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo:'index' },
    { path: 'index', pathMatch: 'full', component: IndexComponent },
    { path: 'realTimeTracking', component: RealTimeTrackingComponent },
    { path: 'trackDetail', component: TrackDetailComponent },
    { path: '**', component: NoContentComponent },
];
