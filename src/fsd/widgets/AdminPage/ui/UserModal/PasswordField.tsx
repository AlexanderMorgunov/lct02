import { Form, Input } from "antd";


export const PasswordField = () => (
  <Form.Item
    name="password"
    label="Пароль"
    rules={[
      { required: true, message: "Введите пароль" },
      { min: 8, message: "Минимальная длина пароля - 8 символов" },
      {
        validator: (_, value) => {
          if (!value) return Promise.resolve();
          if (/[а-яА-ЯЁё]/.test(value))
            return Promise.reject("Пароль не должен содержать кириллицу");
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
            return Promise.reject(
              "Пароль должен содержать хотя бы один спецсимвол"
            );
          return Promise.resolve();
        },
      },
    ]}
  >
    <Input.Password placeholder="Введите пароль" />
  </Form.Item>
)