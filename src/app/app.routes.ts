import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home-tab/home-tab.page').then(
            (m) => m.HomeTabPage
          ),
      },
      {
        path: 'my-home',
        loadComponent: () =>
          import('./pages/home/my-home-tab/my-home-tab.page').then(
            (m) => m.MyHomeTabPage
          ),
      },
      {
        path: 'assemblie',
        loadComponent: () =>
          import('./pages/home/assemblie-tab/assemblie-tab.page').then(
            (m) => m.AssemblieTabPage
          ),
      },
      {
        path: 'suggestion-box',
        loadComponent: () =>
          import(
            './pages/home/suggestion-box-tab/suggestion-box-tab.page'
          ).then((m) => m.SuggestionBoxTabPage),
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
