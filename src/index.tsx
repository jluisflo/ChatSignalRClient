import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import { Chat } from './Chat';
import { Row, Col } from 'antd';

ReactDOM.render(
  <React.StrictMode>
    <Row>
      <Col span={12} offset={6}>
        <Chat />
      </Col>
    </Row>
  </React.StrictMode>,
  document.getElementById('root')
);