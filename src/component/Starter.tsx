import * as React from 'react';
import * as ReactDom from 'react-dom';

const App = () =>{
    return(
        <div>
            <p>No row where selected.</p>
        </div>
    )
}

const Starter = (targetElement) =>{
    ReactDom.render(<App/>, targetElement)
}

export default Starter;