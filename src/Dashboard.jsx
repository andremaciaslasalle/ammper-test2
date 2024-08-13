import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getPinpointKpi } from '../helpers/Pinpoint';

//https://recharts.org/en-US/api/BarChart
//https://recharts.org/en-US/api/Bar


export const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    opened: 0,
    markedAsSpam: 0,
    openedAndDeleted: 0,
    linksAndAttachmentsOpened: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const opened = await getPinpointKpi('txn-emails-opened'); //txn-emails-opened
        const markedAsSpam = await getPinpointKpi('txn-emails-with-complaints');//txn-emails-with-complaints
        const openedAndDeleted = 0
        const linksAndAttachmentsOpened = await getPinpointKpi('txn-emails-clicked') //txn-emails-clicked

        setMetrics({ opened, markedAsSpam, openedAndDeleted, linksAndAttachmentsOpened });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  const data = [
    { name: 'Opened', correos: metrics.opened },
    { name: 'Marked as SPAM', correos: metrics.markedAsSpam },
    { name: 'Opened and Deleted', correos: metrics.openedAndDeleted },
    { name: 'Links and Attachments Opened', correos: metrics.linksAndAttachmentsOpened },
  ];

  return (
    <div className="container mt-5">
      <h2>Métricas de envío de correos Pinpoint</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip isAnimationActive={true}/>
          <Legend />
          <Bar dataKey="correos" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Link to="/" className="btn btn-primary mt-3">Regresar a Home</Link>
    </div>
  );
};