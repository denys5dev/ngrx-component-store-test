import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileStore } from './store/profile.store';
import { take } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  employee: any;
  form: FormGroup;
  colCountByScreen: object;
  form$ = this.profileStore.profile$;

  constructor(
    private _fb: FormBuilder,
    private profileStore: ProfileStore,
    private readonly store: Store
  ) {
    this.employee = {
      ID: 7,
      FirstName: 'Sandra',
      LastName: 'Johnson',
      Prefix: 'Mrs.',
      Position: 'Controller',
      Picture: 'images/employees/06.png',
      BirthDate: new Date('1974/11/15'),
      HireDate: new Date('2005/05/11'),
      /* tslint:disable-next-line:max-line-length */
      Notes:
        'Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you`ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.',
      Address: '4600 N Virginia Rd.',
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    };
  }

  ngOnInit() {
    this.form = this._fb.group({
      name: [null],
      lastName: [null],
      gender: [null],
    });

    this.form$.pipe(take(1)).subscribe((value) => this.form.patchValue(value));

    this.form.valueChanges.subscribe((value) =>
      this.profileStore.updateProfileState(value)
    );
  }

  onSubmit() {
    console.log('submit');
    console.log(this.form.getRawValue());
    this.store.dispatch(new Navigate(['/tasks']));
  }

  reset() {
    this.form.reset();
  }
}
