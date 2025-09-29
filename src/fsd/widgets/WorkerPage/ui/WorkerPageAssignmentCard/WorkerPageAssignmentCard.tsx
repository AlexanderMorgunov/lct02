import { IAssignmentStatus } from "@/fsd/shared/network/assignments/types";
import { Button, Card, Divider } from 'antd';


interface Props {
  task: string;
  status: IAssignmentStatus;
  deadline: string;
  comment: string;
  taskId: number;
}

export const WorkerPageAssignmentCard = (props: Props) => {
  const { task, status, deadline, comment, taskId } = props;

  return (<Card
    title={`Задача №${taskId}`}
    variant={"borderless"}
    styles={{
      body: {
        display: "grid",
        gridTemplateRows: '1fr',
      },
    }}
    className={'grid grid-rows-subgrid row-span-3 gap-0'}
    actions={[<Button key={"take"}>Взять в работу</Button>]}
  >
    <div className={'grid grid-rows-subgrid row-span-4 gap-2'}>
      <div>
        <p><b>Задача:</b> {task}</p>
      </div>
      <div>
        <p><b>Статус:</b> {status}</p>
      </div>
      <div>
        <p><b>Дедлайн:</b> {deadline}</p>
      </div>
      <div>
        <p><b>Комментарий:</b> {comment}</p>
      </div>
    </div>
  </Card>);
}