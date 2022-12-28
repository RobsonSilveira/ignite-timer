import { useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CyclesContext } from '../../contexts/CyclesContext';
import { HistoryContainer, HistoryList, Status } from './styles';
import { ICycle } from '../../reducers/Cycles';

type TStatusFieldProps = {
  color: 'yellow' | 'red' | 'green';
  info: string;
};

type ObjectKeysProps = {
  [key: string]: TStatusFieldProps;
};
type TStatusOptions = ObjectKeysProps & {
  COMPLETE: TStatusFieldProps;
  IN_PROGRESS: TStatusFieldProps;
  INTERRUPTED: TStatusFieldProps;
};

const statusOptions: TStatusOptions = {
  COMPLETE: {
    color: 'green',
    info: 'Concluído'
  },
  IN_PROGRESS: {
    color: 'yellow',
    info: 'Em andamento'
  },
  INTERRUPTED: {
    color: 'red',
    info: 'Interrompido'
  }
};

export function History() {
  const { cycles } = useContext(CyclesContext);

  const renderCycleStatusField = (cycle: ICycle) => {
    let statusProps: TStatusFieldProps = statusOptions.IN_PROGRESS;

    if (cycle.completionDate) {
      statusProps = statusOptions.COMPLETE;
    } else if (cycle.interruptedDate) {
      statusProps = statusOptions.INTERRUPTED;
    }
    return <Status statusColor={statusProps.color}>{statusProps.info}</Status>;
  };

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Duração</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>
                    {cycle.minutesAmount}
                    {cycle.minutesAmount !== 1 ? ' minutos' : ' minuto'}
                  </td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </td>
                  <td>{renderCycleStatusField(cycle)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
