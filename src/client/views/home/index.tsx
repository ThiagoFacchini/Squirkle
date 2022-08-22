import React from 'react';
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

import logo from './../../assets/logo.png'

const Home = () => {
  const navigate = useNavigate()

  return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={ logo } width='520'/>
        </div>
        <div className={styles.disclaimer}>
          Lorem ipsum dolor sit aet, consectetur adipiscing elit. Sed nisi justo, egestas ut mi sit amet, vehicula elementum urna. Suspendisse vitae quam non nisi tempus mollis. Etiam lobortis interdum tincidunt. Aliquam dapibus ex at turpis congue placerat. Quisque mattis diam quis tellus lacinia, vitae venenatis nulla iaculis. Maecenas in tincidunt neque. Integer porta, neque ut semper aliquet, arcu enim bibendum purus, et varius ligula massa nec sapien. Maecenas eleifend felis ac elit congue, a vehicula mi venenatis. Pellentesque sed orci non urna dapibus congue.<br/>
          Mauris nec facilisis velit. Ut sit amet mauris ligula. Integer tempor quis lacus id varius. Sed a metus ac orci tempor maximus. Praesent pretium quis nisl ultricies vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet orci in diam pretium fermentum. Quisque id rutrum nunc. Curabitur tempus sed tortor eu auctor. Proin tempor augue maximus rutrum feugiat. Vivamus sed erat tortor. Duis arcu nisi, mattis vitae dui sed, fringilla pretium libero. Vivamus et molestie dui, vitae ultrices mi. Curabitur metus purus, vestibulum quis urna et, dictum tempus odio. Nunc ut odio sed purus varius viverra ac in sem.
        </div>
        <div className={styles.button} onClick={ () => navigate('/login')}>
          Start
        </div>
      </div>
  )
}

export default Home