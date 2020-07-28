import React from 'react';
import './styles.css';

function CompItem({ comp }) {
 return(
  <li className="comp-item">
       <header>
           <img src={comp.avatar_url} alt={comp.name}/>
            <div className="user-info">
             <strong>{comp.name}</strong>
               <span>{comp.skills.join(', ')}</span>
           </div>            
       </header>
         <p>{comp.bio}</p>
       <a href={`https://github.com/${comp.github_username}`}>Acessar Perfil</a>
     </li>
 );
}

export default CompItem;