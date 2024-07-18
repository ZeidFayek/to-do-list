import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'to-do-list', canActivate: [authGuard], component: ToDoListComponent },
    { path: '**', component: NotFoundComponent }
];
