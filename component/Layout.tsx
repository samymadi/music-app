import React from 'react'
import Head from 'next/head';



interface Props {
        children:JSX.Element[] | JSX.Element
        title?:string
        className?:string
}

function Layout(props: Props) {

    const {children,title,className} = props;

    return (
        <div className={className}>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </ div>
    )
}

export default Layout
