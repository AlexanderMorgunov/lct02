import { IUser, Role } from "@/fsd/entities/AdminPage/types";
import { useDeferredValue, useMemo, useState } from "react";
import { TitleWithSearch } from "../ui/TitleWithSearch/TitleWithSearch";
import { TitleWithSelect } from "../ui/TitleWithSelect/TitleWithSelect";

interface IProps {
  users: IUser[];
}

export const useFilerUsersList = ({ users }: IProps) => {
  const [searchNameText, setSearchNameText] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [searchLoginText, setSearchLoginText] = useState("");
  const [showLoginInput, setShowLoginInput] = useState(false);
  const [showSelectRole, setShowSelectRole] = useState(false);
  const deferredSearchNameText = useDeferredValue(searchNameText);
  const deferredSearchLoginText = useDeferredValue(searchLoginText);
  const [roleFilter, setRoleFilter] = useState<string | number | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchName = deferredSearchNameText
        ? u.fullName
            .toLowerCase()
            .includes(deferredSearchNameText.toLowerCase())
        : true;

      const matchLogin = deferredSearchLoginText
        ? u.login.toLowerCase().includes(deferredSearchLoginText.toLowerCase())
        : true;

      const matchRole = roleFilter !== null ? u.role === roleFilter : true;

      return matchName && matchLogin && matchRole;
    });
  }, [deferredSearchNameText, deferredSearchLoginText, roleFilter, users]);

  const fioTitle = (
    <TitleWithSearch
      setShowInput={setShowNameInput}
      showInput={showNameInput}
      value={searchNameText}
      setValue={setSearchNameText}
      title="ФИО"
    />
  );

  const loginTitle = (
    <TitleWithSearch
      setShowInput={setShowLoginInput}
      showInput={showLoginInput}
      value={searchLoginText}
      setValue={setSearchLoginText}
      title="Логин"
    />
  );
  const roleTitle = (
    <TitleWithSelect
      value={roleFilter}
      setValue={setRoleFilter}
      showSelect={showSelectRole}
      setShowSelect={setShowSelectRole}
      title="Роль"
      options={[
        { value: 0, label: Role.Admin },
        { value: 1, label: Role.Dispatcher },
        { value: 2, label: Role.Emergency },
      ]}
    />
  );

  return {
    showNameInput,
    showLoginInput,
    showSelectRole,
    filteredUsers,
    fioTitle,
    loginTitle,
    roleTitle,
  };
};
