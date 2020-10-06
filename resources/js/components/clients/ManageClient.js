import React, { useState, useEffect } from 'react';
import ClientInfo from './ClientInfo';
import { Link, useParams, Route } from 'react-router-dom';
import ClientOverview from './ClientOverview';
import ClientDetails from './ClientDetails';
import Sessions from '../sessions/Sessions';
import Goals from '../goals/Goals';
import AddSession from '../sessions/AddSession';
import EditSession from '../sessions/EditSession';
import { useAlert } from 'react-alert';
import { getRandomColor } from '../helpers/functions';

const ManageClient = (props) => {
    const params = useParams();
    const id = params.id;
    const [client, setClient] = useState(false);
    const [goals, setGoals] = useState(false);
    const [pocs, setPocs] = useState(false);
    const [page, setPage] = useState(false);
    const [active, setActive] = useState('Overview');
    const [randomColor, setRandomColor] = useState(getRandomColor());

    const alert = useAlert();


    useEffect(() => {
        const fetchClient = async () => {

            axios.all([
                axios.get(`/api/clients/${id}`),
                axios.get(`/api/clients/${id}/goals`),
                axios.get(`/api/clients/${id}/pocs`),
            ])
            .then(axios.spread((clientDataRes, goalDataRes, pocsDataRes) => {
                setClient(goalDataRes.data.client);
                setGoals(goalDataRes.data.goals);
                setPocs(pocsDataRes.data);
            }))
            .catch((err) => console.log(err))
        }

        fetchClient();        
    }, [id, setPocs]);
    
    const updateClient = (e) => {
        const {name, value} = e.target;

        if (client[name] === value) return;

        axios.put(`/api/clients/${id}`, {
            [name]: value,
        })
        .then((res) => res)
        .then((json) => {
            if (json.status === 200) {
                alert.show('Client updated!', {
                    timeout: 2000, // custom timeout just for this one alert
                    type: 'success',
                })

                setClient({
                    ...client,
                    [name]: value,
                })
            }
        })
    }


    return (
        <React.Fragment>
            {client ? (
                <div className="d-flex h-100 anti-container">
                    <div className="d-flex h-100 client-sidebar">
                        <ClientInfo active={active} setActive={setActive} client={client} pocs={pocs} randomColor={randomColor} />
                    </div>
                    <Route 
                        exact
                        path="/clients/:id" 
                        render={() => <ClientOverview client={client} goals={goals} />} 
                    />
                    <Route
                        path="/clients/:id/details"
                        render={() => <ClientDetails client={client} pocs={pocs} updateClient={updateClient} updatePocs={setPocs} />}
                    />
                    <Route
                        path="/clients/:id/goals"
                        render={() => <Goals client={client} />}
                    />
                    <Route
                        exact
                        path="/clients/:id/sessions"
                        render={() => <Sessions client={client} />}
                    />
                    <Route
                        exact
                        path="/clients/:id/sessions/new"
                        render={() => <AddSession client={client}/>}
                    />
                    <Route
                        path="/clients/:id/sessions/:session_id"
                        render={() => <EditSession client={client} />}
                    />
                </div>
            ) : (
                <div>Loading</div>
            )}
        </React.Fragment>
    )
}

export default ManageClient;