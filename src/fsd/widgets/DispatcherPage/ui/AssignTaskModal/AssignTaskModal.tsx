import { IAccident } from "@/fsd/entities/Accident/types/type";
import { ICreateAssignmentRequestBody } from "@/fsd/shared/network/assignments/types";
import { useGetUsers } from "@/fsd/widgets/AdminPage/api/useGetUsers";
import { Form, Modal, Select, DatePicker, Input, FormInstance } from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;

interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (values: ICreateAssignmentRequestBody) => void;
  accident: IAccident;
  form: FormInstance;
}

export const AssignTaskModal = ({
  open,
  onClose,
  onConfirm,
  accident,
  form,
}: IProps) => {
  const { data, isLoading, error } = useGetUsers(["workers"], {
    role: "worker",
  });

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Форма:", values);
      onConfirm({
        accident_id: accident.id,
        date_at: dayjs(values.date_at).format("YYYY-MM-DD"),
        task: values.task,
        user_id: values.user_id,
      });
      form.resetFields();
    } catch (error) {
      console.log("Ошибка валидации:", error);
    }
  };

  return (
    <Modal
      open={open}
      title="Назначить задачу"
      okText="Назначить"
      okType="primary"
      cancelText="Отмена"
      onCancel={onClose}
      onOk={handleOk}
      destroyOnHidden
      afterOpenChange={(visible) => {
        if (visible && accident.title) {
          form.setFieldsValue({ task: accident.title });
        }
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Сотрудник"
          name="user_id"
          rules={[{ required: true, message: "Выберите сотрудника" }]}
        >
          <Select
            placeholder="Выберите сотрудника"
            className="min-w-52 bg-primary-bg"
          >
            {data?.users?.map((w) => (
              <Select.Option key={w.id} value={w.id}>
                {w.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Название задачи"
          name="task"
          rules={[{ required: true, message: "Введите комментарий" }]}
        >
          <TextArea rows={4} placeholder="Комментарий к задаче" />
        </Form.Item>

        <Form.Item
          label="Дедлайн"
          name="date_at"
          rules={[{ required: true, message: "Установите дедлайн по задаче" }]}
        >
          <DatePicker
            className="w-full"
            format="YYYY.MM.DD"
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
