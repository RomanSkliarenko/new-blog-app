import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import hello from '../../images/hello.gif';
import style from './home.module.css';

const Home: React.FC<RouteChildrenProps> = () => (
  <div className={style.container}>
    <h2>
      Welcome page of our service <img src={hello} alt="greeting" />
    </h2>
  </div>
);

export default Home;
