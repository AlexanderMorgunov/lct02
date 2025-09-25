import { Role } from "@/fsd/entities/AdminPage/types/types";
import { useDeferredValue, useState } from "react";
import { TitleWithSearch } from "../ui/TitleWithSearch/TitleWithSearch";
import { TitleWithSelect } from "../ui/TitleWithSelect/TitleWithSelect";
import { TUserRole } from "@/fsd/shared/network/users/types";

export const useFilerUsersList = () => {
  const [searchNameText, setSearchNameText] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [searchLoginText, setSearchLoginText] = useState("");
  const [showLoginInput, setShowLoginInput] = useState(false);
  const [showSelectRole, setShowSelectRole] = useState(false);
  const deferredSearchNameText = useDeferredValue(searchNameText);
  const deferredSearchLoginText = useDeferredValue(searchLoginText);
  const [roleFilter, setRoleFilter] = useState<TUserRole | null>(null);

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
        { value: 'admin', label: Role.Admin },
        { value: 'user', label: Role.Dispatcher },
        { value: 'worker', label: Role.Emergency },
      ]}
    />
  );

  return {
    showNameInput,
    showLoginInput,
    showSelectRole,
    fioTitle,
    loginTitle,
    roleTitle,
    deferredSearchNameText,
    deferredSearchLoginText,
    roleFilter,
  };
};
