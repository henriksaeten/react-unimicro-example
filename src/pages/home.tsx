import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { API_BASE_URL } from '../environment';


interface Users {
    ID: number 
    Info: {
        Name: string;
        DefaultEmail: { EmailAddress: string; }
        DefaultPhone: { Number: string;}
    }
}

const Home = () => {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<Users[]>([]);
    useEffect(() => {
        const getContacts = async () => {
            try {
            setIsLoading(true);
            const params = new URLSearchParams({
                expand: 'Info.Name,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress',
                hateoas: 'false',
            });     
            if (auth.user) {
            const contacts = await fetch(`${API_BASE_URL}biz/contacts?${params.toString()}`, {
                headers: { Authorization: 'Bearer ' + auth.user!.access_token }
            }).then(res => res.json());
            console.log(contacts.data)
            setUsers(contacts);
        }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
    getContacts();
    }, []);

    return (
        <>
    <ul>
        {isLoading && <p>Loading...</p>}
    {users.map(({ ID, Info }) => {
        return (
            <li key={ID}>
                <div>
                    name: {Info!.Name}
                </div>
                <div>
                    Email: {Info!.DefaultEmail.EmailAddress}
                </div>
                <div>
                    Phone: {Info!.DefaultPhone.Number}
                </div>
                <hr/>
            </li>
        )
    })}
     </ul>
    </>
    );

}


export default Home;