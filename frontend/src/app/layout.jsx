import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Jointly - Society Group Booking',
  description: 'Group-buy home services and save big!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white flex flex-col min-h-screen">
        <Header />
        
        {/* main content chi height min set keli aahe mhanje footer nehami khali rahil */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}