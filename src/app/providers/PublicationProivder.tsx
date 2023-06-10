import { AnyPublication, PublicationSortCriteria, useExplorePublications } from "@lens-protocol/react-web";
import { createContext, useContext, useEffect, useState } from "react";

type PublicationProvider = {
    publications: any[] | undefined,
    handleSetPublications: (newArray: any[]) => void
}
const PubContext = createContext<PublicationProvider>({} as PublicationProvider);
export const PubProvider = ({ children }: {
    children: any
}) => {
    const [publications, setPublications] = useState<AnyPublication[]>();
    const { data, loading, hasMore, next } = useExplorePublications({
        limit: 5,
        sortCriteria: PublicationSortCriteria.Latest
    });

    console.log({ data })

    useEffect(() => {
        if (data != undefined) {
            setPublications([...data]);
        }
    }, [data]);

    const handleSetPublications = (newArray: any[]) => {
        setPublications([...newArray]);
    }

    return <PubContext.Provider value={{
        publications: publications,
        handleSetPublications
    }}>{...children}</PubContext.Provider>
}
export const usePubProvider = () => useContext(PubContext);