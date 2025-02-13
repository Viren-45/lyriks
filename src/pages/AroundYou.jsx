import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from '../components'
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
    const [country, setCountry] = useState('IN');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const { data, isFetching, error } = useGetSongsByCountryQuery(country);

    useEffect(() => {

    }, [country]);

    if(isFetching && loading) return <Loader title="Loading songs around you" />;
    if(error && country) return <Error title="Country not in database." />

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around You</h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard 
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default AroundYou;
