import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';

function Homepage(props) {
    return (
    <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta
                name='description'
                content='Browse a huge list of highly active React meetups!'
            />
        </Head>
        <MeetupList meetups={props.meetups}/>
    </Fragment>
    )
}

export async function getStaticProps(){
    //fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://bigoldli0329:KHzlUbG2x1Uy7jZZ@cluster0.fhdc1c1.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1
    };
};


export default Homepage;