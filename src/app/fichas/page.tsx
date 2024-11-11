import MainLayout from "@/components/MainLayout";
import { registros } from "@/mock/registros";
import Ficha from "@/components/Ficha";


const page: React.FC = () => {
    return (
        <MainLayout nav="Ficha Médica" >
            <div className="w-full flex justify-center">

            <div className="grid grid-cols-2 gap-10 justify-items-center">
            {registros.map((registro) => (
                <Ficha key={registro.nome_paciente} tipo={registro.Tipo} nome_paciente={registro.nome_paciente} data_nascimento={registro.data_nascimento} cpf={registro.cpf} rg={registro.rg}/>
            ))}
            </div>
            </div>
        </MainLayout>
    )
}
export default page;