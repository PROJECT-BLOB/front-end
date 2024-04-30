import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

function BasicMapAlpha() {
  const containerStyle = {
    width: '70%',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
  };

  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '';
  const position = { lat: 0, lng: 10 };

  return (
    <APIProvider apiKey={googleMapApiKey}>
      <Map defaultCenter={position} defaultZoom={10} style={containerStyle}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

export default BasicMapAlpha;
