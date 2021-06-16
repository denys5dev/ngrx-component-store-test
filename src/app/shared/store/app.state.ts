import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AppInfoService } from '../services/app-info.service';
import { Task } from './app.action';

export interface AppStateModel {
  tasks: any;
  priority?: any[];
  todo?: any;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    tasks: {},
    priority: [],
  },
})
@Injectable()
export class AppState {
  constructor(private readonly _appInfoService: AppInfoService) {}

  @Action(Task.Todo, { cancelUncompleted: true })
  todo({ dispatch, patchState }: StateContext<AppStateModel>) {
    patchState({ todo: 'pending' });
    return this._appInfoService
      .getTodo()
      .pipe(tap((success) => dispatch(new Task.TodoSuccess(success))));
  }

  @Action(Task.TodoSuccess, { cancelUncompleted: true })
  todoSuccess(
    { patchState, dispatch, getState, setState }: StateContext<AppStateModel>,
    action: Task.TodoSuccess
  ) {
    patchState({ todo: action.payload });
    dispatch(new Navigate(['/tasks']));
  }

  @Action(Task.Priority)
  priority({ patchState, getState }: StateContext<AppStateModel>) {
    const state = getState();
    patchState({
      priority: [
        { name: 'High', value: 4 },
        { name: 'Urgent', value: 3 },
        { name: 'Normal', value: 2 },
        { name: 'Low', value: 1 },
      ],
    });
  }

  @Action(Task.FetchAll)
  fetchAll({
    patchState,
    setState,
    dispatch,
    getState,
  }: StateContext<AppStateModel>) {
    patchState({
      tasks: {
        store: {
          type: 'odata',
          key: 'Task_ID',
          url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks',
        },
        expand: 'ResponsibleEmployee',
        select: [
          'Task_ID',
          'Task_Subject',
          'Task_Start_Date',
          'Task_Due_Date',
          'Task_Status',
          'Task_Priority',
          'Task_Completion',
          'ResponsibleEmployee/Employee_Full_Name',
        ],
      },
    });
  }
}
