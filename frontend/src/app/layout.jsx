import './globals.css';
import Header from '../components/Header'; // 👈 Make sure this is '../components/Header'

export const metadata = {
  title: 'Jointly - Society Group Booking',
  description: 'Group-buy home services and save big!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}