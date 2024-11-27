//import logo from './logo.svg';
import { Col, Row } from 'antd';
import styles from './styles.module.css'; 
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";



import Home from '../Pages/Home';
import HeaderMenu from './Headermenu';
import NewEvent from '../Pages/NewEvent';
import EventPage from '../Pages/EventPage';


function App() {
  return (
    <div className={styles.container}>
      <Row justify={'center'}>
        <Col span={14} className={styles.test}>
        <HeaderMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newEvent" Component={NewEvent} />
        <Route path="/event/:id" Component={EventPage} />
      </Routes>


        
        </Col>  
      </Row>
    </div>
  );
}

export default App;
