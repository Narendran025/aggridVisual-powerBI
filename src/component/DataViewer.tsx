import * as React from 'react'
import * as ReactDom from 'react-dom';
import AgGrid from './AgGrid'
import {VisualSettings} from '../settings';

type PropType = { 
    onRowClick : any,host:any, dataView:any,viewPort: any, visualSetting : VisualSettings
}

const Component = ({onRowClick, host, dataView, viewPort, visualSetting} : PropType) =>{
    const [theme, setTheme] = React.useState(false);
    const [background, setBackground] = React.useState({
        background : '#ffffff', color: '#000000'
    })
    const [scaling, setScaling] = React.useState('normal');
        

    React.useEffect(()=>{
        if(theme){
            persistValues('dark')
        }else{
            persistValues('light')
        }

        if(dataView?.metadata?.objects?.grid?.theme === 'light'){
            setBackground({
                background : "#ffffff",
                color : "#000000"
            });
        }else{
            setBackground({
                background : "#000000",
                color : "#ffffff"
            });
        }
    }, [theme])

    const persistValues = (theme)=>{
        const persistedObjects = {
            merge: [{
                objectName: 'grid',
                properties: {
                    theme: theme
                },
                selector: null
            }]
        };
        host.persistProperties(persistedObjects);
    }
    
    
    const handleClick = () =>{
        setTheme(prev=>!prev);
        
    }
    
    
    const handleSelect = (event)=>{
        event.preventDefault();
        setScaling(event.target.value);
        
    }

    console.log();
    return (
        <div style={{backgroundColor: background.background, color: background.color, padding: '40px'}}>
            <div style={{margin: '20px'}}>
                <button style={{all: 'unset', padding: '5px', border: `1px solid ${background.color}`, borderRadius: '5px'}} onClick={handleClick}>Change Theme</button>
                <select 
                title='Scaling' 
                onClick={handleSelect}
                style={{marginLeft: '15px', height:'32px', width: '130px', padding:'5px', border: `1px solid ${background.color}`, color:background.color, backgroundColor:background.background}}
                >
                    <option value="normal">No scaling</option>
                    <option value="thousand">in Thousand</option>
                    <option value="million">in Million</option>
                    <option value="billion">in Billion</option>
                    <option value="trillion">in Trillion</option>
                </select>
            </div>
            <AgGrid onRowClick={onRowClick} dataView={dataView} viewport={viewPort} scaling={scaling}/>
        </div>
    )
}

const DataViewer = (target,host, onRowClick, dataView,viewPort, visualSetting) => {
    ReactDom.render(<Component onRowClick={onRowClick} host={host} dataView={dataView} viewPort={viewPort} visualSetting={visualSetting}/>, target)
}

export default DataViewer;
