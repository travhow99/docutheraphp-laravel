import React, { useState, useEffect } from 'react';
import ClientInfo from './ClientInfo';
import { Link, useParams, Route } from 'react-router-dom';
import ClientOverview from './ClientOverview';
import ClientDetails from './ClientDetails';
import Sessions from '../sessions/Sessions';
import Goals from '../goals/Goals';
import AddSession from '../sessions/AddSession';
import EditSession from '../sessions/EditSession';

const ManageClient = (props) => {
    const params = useParams();
    const id = params.id;
    const [client, setClient] = useState(false);
    const [goals, setGoals] = useState(false);
    const [poc, setPoc] = useState(false);
    const [page, setPage] = useState(false);
    const [active, setActive] = useState('Overview');

    useEffect(() => {
        const fetchClient = async () => {

            axios.all([
                axios.get(`/api/clients/${id}`),
                axios.get(`/api/clients/${id}/goals`),
                axios.get(`/api/clients/${id}/pocs`),
            ])
            .then(axios.spread((clientDataRes, goalDataRes, pocDataRes) => {
                setClient(goalDataRes.data.client);
                setGoals(goalDataRes.data.goals);
                setPoc(pocDataRes.data);
            }))
            .catch((err) => console.log(err))
        }

        fetchClient();
    }, [id]);
    
    const updateClient = (e) => {
        const {name, value} = e.target;
        console.log(name, value);

        axios.put(`/api/clients/${id}`, {
            [name]: value,
        })
        .then((res) => res)
        .then((json) => {
            if (json.status === 200) {
                console.log(json.data);

                alert('Client updated!')

                setClient({
                    ...client,
                    [name]: value,
                })
            }
        })
    }

    console.log('CLIENT MANGE', client);

    return (
        <React.Fragment>
            {client ? (
                <div className="d-flex h-100 anti-container">
                    <div className="d-flex h-100 client-sidebar">
                        <ClientInfo active={active} setActive={setActive} client={client} poc={poc} />
                    </div>
                    <Route 
                        exact
                        path="/clients/:id" 
                        render={() => <ClientOverview client={client} goals={goals} />} 
                    />
                    <Route
                        path="/clients/:id/details"
                        render={() => <ClientDetails client={client} poc={poc} updateClient={updateClient} />}
                    />
                    <Route
                        path="/clients/:id/goals"
                        render={() => <Goals client={client} poc={poc} />}
                    />
                    <Route
                        exact
                        path="/clients/:id/sessions"
                        render={() => <Sessions client={client} poc={poc} />}
                    />
                    <Route
                        exact
                        path="/clients/:id/sessions/new"
                        render={() => <AddSession client={client}/>}
                    />
                    <Route
                        path="/clients/:id/sessions/:session_id"
                        render={() => <EditSession client={client} poc={poc} />}
                    />
                </div>
            ) : (
                <div>Loading</div>
            )}
        </React.Fragment>
    )
}

export default ManageClient;