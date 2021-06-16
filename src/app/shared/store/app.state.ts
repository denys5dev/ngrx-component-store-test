import { state } from '@angular/animations';
import { Action, State, StateContext } from '@ngxs/store';
import { Task } from './app.action';

export interface AppStateModel {
  tasks: any;
  priority?: any[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    tasks: {},
    priority: [],
  },
})
export class AppState {
  @Action(Task.Priority)
  priority({ patchState }: StateContext<AppStateModel>) {
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
    const state = getState().tasks;
    setState({
      ...state,
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
