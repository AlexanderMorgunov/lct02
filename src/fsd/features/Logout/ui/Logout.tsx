import { IconLogout } from "@/fsd/shared/ui/IconLogout";
import { useState } from "react";
import { useAuthentication } from "@/fsd/shared/store/auth/authorization";
import { Button, Modal} from "antd";
import { useQueryClient } from "@tanstack/react-query";

export const Logout = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuthentication();
  const queryClient = useQueryClient();

  const onConfirm = async () => {
    setOpen(false);
    try {
      await logout();
    } catch (e) {
      console.warn(e);
    }
    queryClient.removeQueries({ queryKey: ["currentUser"] });
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