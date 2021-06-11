import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Profile } from './profile';

export interface ProfileState {
  profile: Profile;
}

@Injectable()
export class ProfileStore extends ComponentStore<ProfileState> {
  readonly profile$ = this.select((state) => state.profile);

  constructor() {
    super({
      profile: {
        name: 'first name',
        lastName: 'last name',
        gender: 'male',
      },
    });

    this.state$.subscribe((state) => console.log(state));
  }

  updateProfileState(profile: any) {
    this.patchState({ profile });
  }

  resetProfile() {
    this.setState({
      profile: {
        name: '',
        lastName: '',
        gender: '',
      },
    });
  }
}
