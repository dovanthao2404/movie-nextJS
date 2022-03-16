import Head from 'next/head';
import React from 'react';
import Footer from './footer';
import Header from "./header";

const Meta = ({ meta }) => {
    return <Head>
        {meta}
    </Head>;
};

const HomeTemplate = ({ children, meta }) => {
    return (
        <>
            <Meta meta={meta} />

            <Header />

            <main>{children}</main>
            <Footer />
        </>
    );
};

export default HomeTemplate;