import { produce } from 'immer';

import { ActionTypes } from './actions';

export interface ICycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  completionDate?: Date;
}

interface CyclesState {
  cycles: ICycle[];
  activeCycleId: string | null;
}

export const cyclesReducer = (state: CyclesState, action: any) => {
  const currentCycleIndex = state.cycles.findIndex(
    (cycle) => cycle.id === state.activeCycleId
  );

  switch (action.type) {
    /** Case ADD_NEW_CYCLE: Adiciona um novo Cycle */
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    }
    /** Case INTERRUPT_CURRENT_CYCLE: Interrompe o Cycle ativo atual*/
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      if (currentCycleIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      });
    }
    /** Case MARK_CURRENT_CYCLE_AS_FINISHED: Finaliza o Cycle ativo atual*/
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      if (currentCycleIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].completionDate = new Date();
      });
    }

    default:
      return state;
  }
};
