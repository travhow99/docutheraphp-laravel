import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Invoices from './Invoices';

const ManageInvoices = () => {
    const [invoices, setInvoices] = useState([]);

    console.log(invoices);

    useEffect(() => {
        (async () => {
            axios.get('/api/invoices').then((res) => {
                setInvoices(res.data.invoices);
            })
        })()
    }, [setInvoices]);

    return (
        <React.Fragment>
            {invoices.length ? (
                <div className="d-flex h-100 anti-container">
                    <Invoices invoices={invoices} withClientName={true} />
                </div>
            ) : (
                <div>Loading {/* TODO loading svg */}</div>
            )}
        </React.Fragment>
    );

}

export default ManageInvoices;