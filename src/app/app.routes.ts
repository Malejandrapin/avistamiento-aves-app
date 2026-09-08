import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('../app/layout/mainlayoutcomponent/mainlayoutcomponent').then(m => m.Mainlayoutcomponent),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'bird'
            },
            {
                path: 'bird',
                loadComponent: () => import('./components/sighting-form/sighting-form.component/sighting-form.component').then(m => m.SightingFormComponent)
            },
            {
                path: 'pinguino',
                loadComponent: () => import('./components/pinguino-form/pinguino-form.component').then(m => m.PinguinoFormComponent)
            },
            {
                path: 'aguila',
                loadComponent: () => import('./components/aguila-form/aguila-form.component').then(m => m.AguilaFormComponent)
            },
            {
                path: '**',
                redirectTo: 'bird'
            }
        ]
    }
];
