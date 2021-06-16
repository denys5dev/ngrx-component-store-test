export namespace Task {
  export class Remove {
    static readonly type = '[App] Remove Task';
    constructor(public payload: string | number) {}
  }

  export class FetchAll {
    static readonly type = '[App] Fetch ALl';
  }

  export class Priority {
    static readonly type = '[App] Fetch Priority';
  }
}
