import { useContext, useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

import { CountdownContainer, Separator } from './styles';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export const Countdown = () => {
  const {
    activeCycleId,
    activeCycle,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const handleUpdateDocumentTitle = (clear = false) => {
    if (clear) {
      document.title = `Home`;
      return;
    }
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  };

  useEffect(() => {
    handleUpdateDocumentTitle();
  }, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle!.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          setSecondsPassed(totalSeconds);
          markCurrentCycleAsFinished();
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed
  ]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
};
