import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [NzLayoutModule, RouterModule],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have the 'sandbox-frontend' title`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('sandbox-frontend');
	});

	it('should render title', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('h1')?.textContent).toContain('Sandbox');
	});
});
