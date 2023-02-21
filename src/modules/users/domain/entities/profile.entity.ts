export class ProfileEntity {
  constructor(public name: string, public nick: string) {}

  static create(profile: UserProfile) {
    return new ProfileEntity(profile.name, profile.nick);
  }
}

export type UserProfile = {
  name: string;
  nick: string;
};
