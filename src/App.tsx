//import { useAuth } from 'react-oidc-context'
//import { API_BASE_URL } from './environment';
import './App.css'
//import { useState } from 'react';
//import Navbar from './components/navbar';
import AppRoutes from './routes';
//import Home from './pages/home';


function App() {
    //const auth = useAuth();
    //const [isLoading, setIsLoading] = useState(false);
    
    //if (!auth.isAuthenticated) {
    //    return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
    //}
    //            <Navbar />
    return (
        <main>
            <AppRoutes />
            {/*<Home/>*/}
            {/*<span>Authenticated!</span>
            <button onClick={() => sendTestRequest(auth.user!.access_token)}> 
                Send test request
            </button> 

            <button className="text" onClick={() => auth.signoutRedirect()}>Log out</button>
    */}
           </main>
    );
}

//async function sendTestRequest(token: string) {
//    const res = await fetch(API_BASE_URL + '/biz/users?action=current-session', {
//        headers: { Authorization: 'Bearer ' + token }
//    });
//
//    if (res.ok) {
//        const user = await res.json();
//        window.alert('Current user: ' + (user.Name || user.UserName || user.Email));
//    } else {
//        window.alert('Error: ' + await res.text());
//    }
//}


//async function getAllContacts(token: string) {
//    const params = new URLSearchParams({
//        expand: 'Info.Name,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress',
//        hateoas: 'false',
//    });
//    const contacts = await fetch(`${API_BASE_URL}biz/contacts?${params.toString()}`, {
//        headers: { Authorization: 'Bearer ' + token },
//    }).then(res => res.json());
//    return contacts; 
//}

export default App