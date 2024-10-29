import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
//import { getLocationOrigin } from 'next/dist/shared/lib/utils';

const Home = async () => {
    const loggedIn = await getLoggedInUser();

    console.log(loggedIn); // Revisa el valor de loggedIn aquí
    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type="greeting"
                        title="Bienvenido"
                        user={loggedIn?.name || 'Guest'}
                        subtext="Accede y maneja tus cuentas y transacciones de manera eficiente"
                    />

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={0}
                        totalCurrentBalance={0}
                    />
                </header>

                ¡Gracias por confiar en nosotros! Pronto podrás usar la mejor herramienta financiera
            </div>

            <RightSidebar
                user={loggedIn || defaultUser} // Proporcionar un usuario por defecto si loggedIn es null
                transactions={[]}
                banks={[
                    {
                        $id: '1',
                        accountId: 'account-1',
                        bankId: 'bank-1',
                        accessToken: 'token-1',
                        currentBalance: 123.50,
                        officialName: 'Bank One', // Otras propiedades necesarias
                        // Asegúrate de agregar cualquier otra propiedad requerida por Bank
                    },
                    {
                        $id: '2',
                        accountId: 'account-2',
                        bankId: 'bank-2',
                        accessToken: 'token-2',
                        currentBalance: 500.50,
                        officialName: 'Bank Two', // Otras propiedades necesarias
                        // Asegúrate de agregar cualquier otra propiedad requerida por Bank
                    }
                ]}
                
            />
        </section>
    )
}

// Define un usuario por defecto si es necesario
const defaultUser = {
    userId: '', // Asegúrate de incluir todas las propiedades requeridas en tu interfaz User
    dwollaCustomerUrl: '',
    dwollaCustomerId: '',
    firstName: 'Guest',
    lastName: '',
    // Otras propiedades necesarias...
};

export default Home
