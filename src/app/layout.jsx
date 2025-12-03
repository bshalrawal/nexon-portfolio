import '../index.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Provider from '../components/SessionProvider';

export const metadata = {
    title: 'nexoninc-portfolio',
    description: 'Portfolio',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="app">
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </Provider>
            </body>
        </html>
    );
}
