import React, { useState, useEffect } from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import CompForm from './components/CompForm';
import CompItem from './components/CompItem';

function App() {  
  const [comps, setComps] = useState([]);


 
    useEffect(() => {
    async function loadComps(){
      const response = await api.get('/comps');
      setComps(response.data);
    }
    loadComps();
  },[]);

  async function handleAddDev(data) {
    const response = await api.post('/comps', data) 
    
   
    setComps([...comps, response.data]);
  }

  return (
  <div id="app">
    <aside>
     <strong>Cadastrar</strong>
      <CompForm onSubmit={handleAddDev} />
    </aside>

    <main>
      <ul>
        {comps.map(comp => (
            <CompItem key={comp.id}  comp={comp} />
        ))}
      </ul>
    </main>
  </div>
  );
}

export default App;
