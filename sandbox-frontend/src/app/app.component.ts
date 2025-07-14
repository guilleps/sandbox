import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: false,
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'sandbox-frontend';

	constructor(public router: Router) {}

	navigateToUserTasks(): void {
		this.router.navigate(['/user-tasks']);
	}
}
