import React, { useEffect, useState } from  'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import CreateGrid from './components/CreateGrid';
import axios from 'axios';

function App()  {
  const [data, setData] = useState([]);
  const [updated, setUpdated] = useState(new Date(0));

  const retrieveData = () => {
    const date = new Date(Date.now());
    const day = date.getDay();
    const hours = date.getHours();
    const mins = date.getMinutes();

    const requestURL = `https://apis.scottylabs.org/dining/location/time/${day}/${hours}/${mins}`;

    axios.get(requestURL).then((response) => {
      setData(response.data);
      setUpdated(date);
    });
  };

  const timeString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let hour = date.getHours();
    const minutes = date.getMinutes();
    let period = 'AM';
    
    if (hour >= 12) {
      hour = hour - 12;
      period = 'PM';
    }

    if (hour === 0) {
      hour = 12;
    }

    let minuteString = '';
    if (minutes < 10) {
      minuteString = minuteString + '0' + minutes;
    } else {
      minuteString = minutes;
    }

    return `${month}/${day}/${year} at ${hour}:${minuteString} ${period}`;
  }

  useEffect(retrieveData, []);

  return (
    <Container>
      <Header as='h2'>Lo and behold! Meals for thy empty stomach.</Header>
      <Button onClick={retrieveData}>Click me to refresh</Button>
      <p>Last updated: {timeString(updated)}</p>
      <Grid columns={5}>
        <CreateGrid locations={data} />
      </Grid>
    </Container>
  );
}

export default App;