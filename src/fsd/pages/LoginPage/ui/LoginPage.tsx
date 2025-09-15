import {Login} from "@/fsd/features/Login";
import {IconLogo} from "@/fsd/shared/ui/IconLogo";


export const LoginPage = () => {
  return (
    <div className={'h-screen flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center gap-5 lg:flex-row-reverse'}
         style={{backgroundImage: 'url(/images/login/bg-loginpage.png)', backdropFilter: 'brightness(50%)'}}
    >
      <div className={'flex flex-col gap-4 max-w-[170px]'}>
        <div className={'flex flex-row items-center gap-2 text-2xl font-bold text-black'}>
          <IconLogo className="w-8 h-8"/> МосТруба
        </div>
        <div className={'text-black text-sm text-center'}>
          поток безопасности водоснабжения
        </div>
      </div>

      <Login/>
    </div>
  )
}