import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';

const Home = () => {
    const loggedIn={firstName: 'David', lastName:'Espejo', email:'davas.espejo@gmail.com'};
  return (
    <section className='home'>
    <div className='home-content'>
        <header className='home-header'>
            <HeaderBox
                type="greeting"
                title="Bienvenido"
                user={loggedIn?.firstName || 'Guest'}
                subtext="Accede y maneja tus cuentas y transacciones de manera eficiente"         
            />

            <TotalBalanceBox 
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={1250.35}
            />
        </header>
        
        RECENT TRANSACTIONS
    </div>

    <RightSidebar 
    user={loggedIn}
    transactions={[]}
    banks={[{currentBalance:123.50}, {currentBalance:500.50}]}    
    />
    </section>
  )
}

export default Home