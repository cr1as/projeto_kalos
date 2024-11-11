import MainLayout from "@/components/MainLayout";
import RegistroCard from "@/components/RegistroCard";
import { registros } from "@/mock/registros";


const page: React.FC = () => {
    return (
        <MainLayout nav="Recém acessados" >
            <div className="w-full flex justify-center">

            <div className="w-4/5 grid grid-cols-3 gap-10 justify-items-center">
            {registros.map((registro) => (
                <RegistroCard key={registro.nome_paciente} tipo={registro.Tipo} nome_paciente={registro.nome_paciente} data_nascimento={registro.data_nascimento} cpf={registro.cpf} rg={registro.rg}/>
            ))}
            </div>
            </div>
        </MainLayout>
    )
}
export default page;