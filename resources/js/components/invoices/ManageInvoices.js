import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import EditInvoice from './EditInvoice';
import Invoices from './Invoices';

const ManageInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [editing, setEditing] = useState(false)

    console.log(invoices);
    console.log(editing);
    useEffect(() => {
        (async () => {
            axios.get('/api/invoices').then((res) => {
                setInvoices(res.data.invoices);
            })
        })()
    }, [setInvoices]);

    const currentInvoice = invoices.find((i) => i.id === editing);

    return (
        <React.Fragment>
            {invoices.length ? (
                <div className="d-flex h-100"/*  anti-container" */>
                    {editing ? (
                        <React.Fragment>
                            {/* <div className="d-flex h-100 client-sidebar">
                                <ClientInfo active={active} setActive={setActive} client={client} pocs={pocs} randomColor={randomColor} />
                            </div> */}
                            <div className="w-100">
                                <EditInvoice invoice={currentInvoice} invoices={invoices} editInvoice={setEditing} updateInvoices={setInvoices} />
                            </div>

                        </React.Fragment>
                    ) : (
                        <Invoices invoices={invoices} withClientName={true} editInvoice={setEditing} />
                    )}
                </div>
            ) : (
                    <div>Loading {/* TODO loading svg */}</div>
                )}
        </React.Fragment>
    );

}

export default ManageInvoices;