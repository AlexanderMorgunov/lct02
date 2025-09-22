import { IconLogout } from "@/fsd/shared/ui/IconLogout";
import { useState } from "react";
import { useAuthentication } from "@/fsd/shared/store/auth/authorization";
import { Button, Modal} from "antd";

export const Logout = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuthentication();

  const onConfirm = async () => {
    setOpen(false);
    await logout();
  }

  return (
    <>
      <Button type={'text'} className="flex gap-3" onClick={() => setOpen(true)}>
        <span>Выйти</span>
        <IconLogout/>
      </Button>

      <Modal
        open={open}
        title="Выход"
        okText="Выйти"
        okType="primary"
        cancelText="Отмена"
        onCancel={() => setOpen(false)}
        onOk={onConfirm}
        destroyOnHidden
      >
        <p>Вы действительно хотите выйти?</p>
      </Modal>
    </>
  )
}