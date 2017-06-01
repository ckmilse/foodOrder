
import { Routes } from '@angular/router';
// import { indexModule } from './pages/index';
import { NoContentComponent } from './pages/no-content';
import { RealTimeTrackingComponent, TrackDetailComponent, IndexComponent } from './pages';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo:'indexComponent' },
    { path: 'index', pathMatch: 'full', redirectTo:'indexComponent' },
    { path: 'realTimeTracking', component: RealTimeTrackingComponent },
    { path: 'trackDetail', component: TrackDetailComponent },
    { path: '**', component: NoContentComponent },
];
