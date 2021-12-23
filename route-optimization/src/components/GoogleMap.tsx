/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START maps_react_map]
import * as React from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { createCustomEqual } from 'fast-equals'
import { isLatLngLiteral } from '@googlemaps/typescript-guards'
import styled from 'styled-components'
import { Landfill } from '../types'


const TopSpacing = styled.div`
  margin-top: 2em;
`

const render = (status: Status) => {
    return <h1>{status}</h1>
}

interface MyProps {
    landfills?: Landfill[];
}

const GoogleMap = ({ landfills }: MyProps) => {
    // [START maps_react_map_component_app_state]
    // const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([])
    const [zoom, setZoom] = React.useState(3) // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 27,
        lng: 27.3,
    })


    // const createLandfillMarkers = () => {
    //     const 
    //     if (landfills) {
    //         for (let i = 0; i < landfills.length; i++) {
    //             const current_landfill = landfills[i]
    //             const latitude = current_landfill.latitude
    //             const longitude = current_landfill.longitude
    //             const lat_lng = { lat: latitude, lng: longitude }

    //         }
    //     }

    // }



    const onClick = (e: google.maps.MapMouseEvent) => {
        console.log(e.latLng!)
        // avoid directly mutating state
        // setClicks([...clicks, e.latLng!])
    }

    const onIdle = (m: google.maps.Map) => {
        console.log('onIdle')
        setZoom(m.getZoom()!)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setCenter(m.getCenter()!.toJSON())
    }
    // [END maps_react_map_component_app_state]



    // [START maps_react_map_component_app_return]
    return (
        <div >
            <TopSpacing>
                <Wrapper apiKey={'AIzaSyDBWA8Gu8uc_uOL6Sp2ZIFsRI53PKbAjkw'} render={render}>
                    <Map
                        center={center}
                        onClick={onClick}
                        onIdle={onIdle}
                        zoom={zoom}
                        style={{ flexGrow: '1', height: '50vh' }}
                    >
                        {landfills && landfills.map((landfill) => {
                            const latlng = { lat: landfill.latitude, lng: landfill.longitude }
                            if(landfill.active){
                                return(< Marker key = { landfill.id } position = { latlng } />)
                            }else{
                                return
                            }
                            
                        })}
                    </Map>
                </Wrapper>
            </TopSpacing>
        </div >
    )
    // [END maps_react_map_component_app_return]
}
interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
    onClick,
    onIdle,
    children,
    style,
    ...options
}) => {
    // [START maps_react_map_component_add_map_hooks]
    const ref = React.useRef<HTMLDivElement>(null)
    const [map, setMap] = React.useState<google.maps.Map>()

    React.useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}))
        }
    }, [ref, map])
    // [END maps_react_map_component_add_map_hooks]

    // [START maps_react_map_component_options_hook]
    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options)
        }
    }, [map, options])
    // [END maps_react_map_component_options_hook]

    // [START maps_react_map_component_event_hooks]
    React.useEffect(() => {
        if (map) {
            ['click', 'idle'].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            )

            if (onClick) {
                map.addListener('click', onClick)
            }

            if (onIdle) {
                map.addListener('idle', () => onIdle(map))
            }
        }
    }, [map, onClick, onIdle])
    // [END maps_react_map_component_event_hooks]

    // [START maps_react_map_component_return]
    return (
        <>
            <div ref={ref} style={style} />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map })
                }
            })}
        </>
    )
    // [END maps_react_map_component_return]
}

// [START maps_react_map_marker_component]
const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>()

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker())
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null)
            }
        }
    }, [marker])

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options)
        }
    }, [marker, options])

    return null
}
// [END maps_react_map_marker_component]

const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a: any, b: any) => {
        if (
            isLatLngLiteral(a) ||
            a instanceof google.maps.LatLng ||
            isLatLngLiteral(b) ||
            b instanceof google.maps.LatLng
        ) {
            return new google.maps.LatLng(a).equals(new google.maps.LatLng(b))
        }

        // TODO extend to other types

        // use fast-equals for other objects
        return deepEqual(a, b)
    }
)

function useDeepCompareMemoize(value: any) {
    const ref = React.useRef()

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value
    }

    return ref.current
}

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize))
}


// // [END maps_react_map]
// let PRESERVE_COMMENT_ABOVE // force tsc to maintain the comment above eslint-disable-line

export default GoogleMap