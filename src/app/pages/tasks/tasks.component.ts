import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import 'devextreme/data/odata/store';
import { Task } from 'src/app/shared/store/app.action';

@Component({
  templateUrl: 'tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  @Select() app$;

  constructor(private readonly store: Store) {
    this.store.dispatch([new Task.FetchAll(), new Task.Priority()]);
  }
}
