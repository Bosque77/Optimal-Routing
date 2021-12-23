import React from 'react'
import './styles.css'

class Map extends React.Component {



    componentDidMount () {
        const script = document.createElement('script')
    
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDBWA8Gu8uc_uOL6Sp2ZIFsRI53PKbAjkw&callback=initMap&v=weekly'
        script.async = true
    
        document.body.appendChild(script)
    }

    render(){
        return(
            <div>
                <div id="map"></div>
                
            </div >
        )
    }

}

export default Map