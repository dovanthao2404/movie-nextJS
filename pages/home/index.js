import React from 'react';
import HomeTemplate from "./../../components/HomeTemplate";

import imageLogo from "./../../assets/image/web-logo.png";

let host = "";
if (typeof window !== "undefined") {
    host = window.location.host;
}

console.log(host);
const Home = (props) => {

    const meta = (<>
        <meta
            name="description"
            content={`Đặt vé xem phim OMG`}
        />
        <meta property="og:image" content={host + imageLogo.src} />

    </>);
    return (

        <HomeTemplate meta={meta} >
            hihi
            <img src={imageLogo.src} alt="" />
        </HomeTemplate>

    );
};

export default Home;