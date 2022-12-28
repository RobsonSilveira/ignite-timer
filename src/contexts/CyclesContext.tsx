import { differenceInSeconds } from 'date-fns';
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState
} from 'react';

import { cyclesReducer, ICycle } from '../reducers/Cycles';
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFisnishedAction
} from '../reducers/Cycles/actions';

interface ICreateCycleData {
  task: string;
  minutesAmount: number;
}

interface ICyclesContext {
  /** Properties */
  cycles: ICycle[];
  activeCycleId: string | null;
  activeCycle: ICycle | undefined;
  amountSecondsPassed: number;

  /** Functions */
  createNewCycle: (cycleData: ICreateCycleData) => void;
  interruptCurrentCycle: () => void;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as ICyclesContext);

interface ICyclesContextProvider {
  children: ReactNode;
}

export const CyclesContextProvider = ({ children }: ICyclesContextProvider) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0'
      );
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
    }
  );

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle: ICycle | undefined = cycles.find(
    (cycle) => cycle.id === activeCycleId
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle!.startDate));
    }
    return 0;
  });

  const createNewCycle = (data: ICreateCycleData) => {
    const id = String(new Date().getTime());
    const newCycle: ICycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };
    dispatch(addNewCycleAction(newCycle));
  };

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction());
  };

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFisnishedAction());
  };

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        activeCycleId,
        activeCycle,
        cycles,
        amountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
        setSecondsPassed
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
