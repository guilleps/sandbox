import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@NgModule({
	imports: [
		CommonModule,
		NzButtonModule,
		NzCardModule,
		NzCheckboxModule,
		NzDividerModule,
		NzFormModule,
		NzGridModule,
		NzIconModule,
		NzListModule,
		NzTagModule,
		NzSelectModule,
		NzInputModule,
		NzAvatarModule,
		NzAlertModule,
	],
	exports: [
		NzButtonModule,
		NzCardModule,
		NzCheckboxModule,
		NzDividerModule,
		NzFormModule,
		NzGridModule,
		NzIconModule,
		NzListModule,
		NzTagModule,
		NzSelectModule,
		NzInputModule,
		NzAvatarModule,
		NzAlertModule,
	],
})
export class SharedModule {}
