import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary"><Link to="/dashboard">Back Home</Link></Button>}
    style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: "90vh"}}
  />
);

export default NotFoundPage;