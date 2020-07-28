import React,  { useState, useEffect } from 'react';

function CompForm({onSubmit}) {

 const [github_username, setGithubUsername] = useState ('');
 const [skills, setSkills] = useState ('');
 const [telefone, setTelefone] = useState ('');
 const [email, setEmail] = useState ('');
 const [latitude, setLatitude] = useState('');
 const [longitude, setLongitude] = useState('');

 useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position)=> {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    },
    (err)=>{
      console.log(err);
    },
    
    {
      timeout: 3000,
    }
  )
}, []);

async function handleSubmit(e){
 e.preventDefault();

 await onSubmit({
  github_username,
  telefone,
  email,
  skills,
  latitude,
  longitude,
 });
 
 setGithubUsername('');
 setSkills(''); 

}

 return (
  <form onSubmit={handleSubmit}>
  <div className="input-block"> 
      <label htmlFor="github_username">Usuário</label>
      <input
      name="github_username"
      id="github_username"
      required
      value={github_username}
      onChange={e => setGithubUsername(e.target.value)}
      />
  </div>

  <div className="input-block">
    <label htmlFor="skills">Habilidades / Profissão</label>
    <input
    name="skills"
    id="skills"
    required
    value={skills}
    onChange={e => setSkills(e.target.value)}
    />
  </div>

   <div className="input-block">
    <label htmlFor="telfone">Telefone</label>
    <input
    name="telefone"
    id="telefone"
    required
    value={telefone}
    onChange={e => setTelefone(e.target.value)}
    />
  </div>

  <div className="input-block">
    <label htmlFor="email">E-mail</label>
    <input
    type="text"
    name="email"
    id="email"
    required
    value={email}
    onChange={e => setEmail(e.target.value)}
    />
  </div>  

  <div className="input-group">
    <div className="input-block">
    <label htmlFor="latitude">Latitude</label>
    <input
    type="number"
    name="latitude"
    id="latitude"
    required
    value={latitude}
    onChange={e => setLatitude (e.target.value)}
    />
    </div>

    <div className="input-block">
     <label htmlFor="longitude">Longitude</label>
     <input
     type="number"
     name="longitude"
     id="longitude"
     required
     value={longitude}
     onChange={e => setLongitude (e.target.value)}
     />         
    </div>
</div>
          

          
  <button type="submit" >Salvar</button>
 </form>
 
 );

}

export default CompForm;